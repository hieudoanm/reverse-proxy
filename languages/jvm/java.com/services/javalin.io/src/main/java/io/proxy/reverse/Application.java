package io.proxy.reverse;

import io.javalin.Javalin;
import io.javalin.http.Context;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Application {
  public static void main(String[] args) {
    var client = HttpClient.newHttpClient();
    var app = Javalin.create().start(8080);

    app.get("/proxy", ctx -> handleProxy(ctx, client));
  }

  private static void handleProxy(Context ctx, HttpClient client) {
    String url = ctx.queryParam("url");
    if (url == null || url.isBlank()) {
      ctx.status(400).result("Missing 'url' query parameter");
      return;
    }

    try {
      var request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .GET()
        .build();

      var response = client.send(request, HttpResponse.BodyHandlers.ofString());
      ctx.status(response.statusCode()).result(response.body());

    } catch (IOException | InterruptedException e) {
      ctx.status(500).result("Internal server error: " + e.getMessage());
      Thread.currentThread().interrupt();
    }
  }
}
