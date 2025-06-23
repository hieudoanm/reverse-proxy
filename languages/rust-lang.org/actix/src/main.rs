use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use reqwest::Client;
use std::sync::Arc;

/// Shared HTTP client
struct ProxyClient {
    client: Client,
}

/// Proxy handler that forwards requests dynamically
#[get("/proxy")]
async fn proxy_handler(query: web::Query<std::collections::HashMap<String, String>>, data: web::Data<Arc<ProxyClient>>) -> impl Responder {
    if let Some(url) = query.get("url") {
        // Ensure the URL is valid
        if !url.starts_with("http://") && !url.starts_with("https://") {
            return HttpResponse::BadRequest().body("Invalid target URL");
        }

        match data.client.get(url).send().await {
            Ok(response) => match response.text().await {
                Ok(body) => HttpResponse::Ok().body(body),
                Err(_) => HttpResponse::InternalServerError().body("Failed to read response"),
            },
            Err(_) => HttpResponse::InternalServerError().body("Proxy error"),
        }
    } else {
        HttpResponse::BadRequest().body("Missing 'url' parameter")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let client = Arc::new(ProxyClient { client: Client::new() });

    println!("Starting Actix proxy server on http://127.0.0.1:8080");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(client.clone()))
            .service(proxy_handler)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
