use warp::{Filter, http::Response};
use reqwest::Client;
use std::convert::Infallible;
use std::collections::HashMap;
use bytes::Bytes;

#[tokio::main]
async fn main() {
    let client = Client::new();

    let proxy = warp::path("proxy")
        .and(warp::query::<HashMap<String, String>>())
        .and(warp::body::bytes())
        .and(warp::method())
        .and(warp::header::optional::<String>("content-type"))
        .and(warp::any().map(move || client.clone()))
        .and_then(handle_proxy);

    warp::serve(proxy).run(([127, 0, 0, 1], 8080)).await;
}

async fn handle_proxy(
    query_params: HashMap<String, String>,
    body: Bytes,
    method: warp::http::Method,
    content_type: Option<String>,
    client: Client,
) -> Result<impl warp::Reply, Infallible> {
    // Ensure the "url" parameter is present
    let target_url = match query_params.get("url") {
        Some(url) => url.clone(),
        None => return Ok(Response::builder().status(400).body("Missing 'url' parameter".into())),
    };

    // Remove "url" from query params before forwarding
    let filtered_query: HashMap<_, _> = query_params.into_iter().filter(|(k, _)| k != "url").collect();

    let mut req = client.request(method.clone(), &target_url);

    if !filtered_query.is_empty() {
        req = req.query(&filtered_query);
    }

    if method == warp::http::Method::POST {
        req = req.body(body.to_vec());
    }

    if let Some(ct) = content_type {
        req = req.header("Content-Type", ct);
    }

    match req.send().await {
        Ok(resp) => {
            let status = resp.status();
            let body = resp.bytes().await.unwrap_or_else(|_| Bytes::from("Error retrieving response"));
            Ok(Response::builder().status(status).body(body))
        }
        Err(_) => Ok(Response::builder().status(500).body(Bytes::from("Proxy Error"))),
    }
}
