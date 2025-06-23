#[macro_use]
extern crate rocket;

use rocket::http::Status;
use rocket::response::status;
use rocket::State;
use reqwest::Client;

/// Shared HTTP client
#[derive(Clone)]
struct ProxyClient {
    client: Client,
}

/// Proxy handler that forwards requests dynamically
#[get("/proxy?<url>")]
async fn proxy_handler(url: String, client: &State<ProxyClient>) -> Result<String, status::Custom<String>> {
    // Ensure the URL is valid
    if !url.starts_with("http://") && !url.starts_with("https://") {
        return Err(status::Custom(Status::BadRequest, "Invalid target URL".into()));
    }

    match client.client.get(&url).send().await {
        Ok(response) => match response.text().await {
            Ok(body) => Ok(body),
            Err(_) => Err(status::Custom(Status::InternalServerError, "Failed to read response".into())),
        },
        Err(_) => Err(status::Custom(Status::InternalServerError, "Proxy error".into())),
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .manage(ProxyClient { client: Client::new() })
        .mount("/", routes![proxy_handler])
}
