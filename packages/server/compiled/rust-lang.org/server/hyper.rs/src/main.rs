use std::{convert::Infallible, sync::Arc};

use anyhow::Result;
use bytes::Bytes;
use http_body_util::{BodyExt, Full};
use hyper::{
    Request, Response, StatusCode, Uri, body::Incoming, server::conn::http1, service::service_fn,
};
use hyper_util::{
    client::legacy::{Client, connect::HttpConnector},
    rt::{TokioExecutor, TokioIo},
};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() -> Result<()> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("🚀 Reverse proxy running on http://127.0.0.1:8080");

    let connector = HttpConnector::new();
    let client = Arc::new(Client::builder(TokioExecutor::new()).build(connector));

    loop {
        let (stream, _) = listener.accept().await?;
        let io = TokioIo::new(stream);
        let client = client.clone();

        tokio::spawn(async move {
            if let Err(err) = http1::Builder::new()
                .serve_connection(io, service_fn(move |req| proxy(req, client.clone())))
                .await
            {
                eprintln!("❌ Connection error: {:?}", err);
            }
        });
    }
}

async fn proxy(
    req: Request<Incoming>,
    client: Arc<Client<HttpConnector, Full<Bytes>>>,
) -> Result<Response<Full<Bytes>>, Infallible> {
    // Extract ?url=<URL>
    let url = match req.uri().query().and_then(|q| {
        q.split('&')
            .find_map(|kv| kv.strip_prefix("url="))
            .map(|s| s.to_string())
    }) {
        Some(t) => t,
        None => {
            return Ok(Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body(Full::new(Bytes::from_static(
                    b"Missing 'url' query parameter",
                )))
                .unwrap());
        }
    };

    // Parse url URI
    let uri: Uri = match url.parse() {
        Ok(u) => u,
        Err(_) => {
            return Ok(Response::builder()
                .status(StatusCode::BAD_REQUEST)
                .body(Full::new(Bytes::from_static(b"Invalid URL")))
                .unwrap());
        }
    };

    // Create proxied request
    let mut new_req = Request::builder()
        .method(req.method())
        .uri(uri)
        .version(req.version());

    let mut headers = req.headers().clone();
    headers.remove("host");
    *new_req.headers_mut().unwrap() = headers;

    let Ok(res) = client
        .request(new_req.body(Full::new(Bytes::new())).unwrap())
        .await
    else {
        return Ok(Response::builder()
            .status(StatusCode::BAD_GATEWAY)
            .body(Full::new(Bytes::from_static(b"Bad Gateway")))
            .unwrap());
    };

    // ✅ Split response into parts to keep headers after consuming body
    let (parts, body) = res.into_parts();

    // Collect full body
    let collected = body
        .collect()
        .await
        .map(|full| full.to_bytes())
        .unwrap_or_default();

    // Build new response
    let mut builder = Response::builder()
        .status(parts.status)
        .version(parts.version);

    // Copy headers except hop-by-hop ones
    for (k, v) in parts.headers.iter() {
        if k != "content-length" && k != "transfer-encoding" {
            builder = builder.header(k, v);
        }
    }

    Ok(builder.body(Full::new(collected)).unwrap())
}
