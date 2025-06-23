use hyper::{Body, Client, Request, Response, Server, Uri, HeaderMap};
use hyper::service::{make_service_fn, service_fn};
use std::convert::Infallible;
use std::net::SocketAddr;
use url::Url;

async fn proxy(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    let client = Client::new();

    // Extract the target URL from query parameters
    let full_uri = format!("http://localhost{}", req.uri());
    let parsed_url = Url::parse(&full_uri).unwrap();

    let target = match parsed_url.query_pairs().find(|(key, _)| key == "target") {
        Some((_, value)) => value.to_string(),
        None => {
            return Ok(Response::builder()
                .status(400)
                .body(Body::from("Missing 'target' query parameter"))
                .unwrap());
        }
    };

    // Rewrite the request URI
    let path = parsed_url.path();
    let target_uri = format!("{}{}", target, path);

    if let Ok(uri) = target_uri.parse::<Uri>() {
        let (mut parts, body) = req.into_parts();
        parts.uri = uri;
        parts.headers = HeaderMap::new();
        println!("{:#?}", parts);
        let new_req = Request::from_parts(parts, body);

        // Forward the request
        match client.request(new_req).await {
            Ok(response) => Ok(response),
            Err(_) => Ok(Response::builder()
                .status(502)
                .body(Body::from("Bad Gateway"))
                .unwrap()),
        }
    } else {
        Ok(Response::builder()
            .status(400)
            .body(Body::from("Invalid target URL"))
            .unwrap())
    }
}

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));

    let make_svc = make_service_fn(|_conn| async {
        Ok::<_, Infallible>(service_fn(proxy))
    });

    let server = Server::bind(&addr).serve(make_svc);

    println!("Dynamic Reverse Proxy running on http://{}", addr);

    if let Err(e) = server.await {
        eprintln!("Server error: {}", e);
    }
}
