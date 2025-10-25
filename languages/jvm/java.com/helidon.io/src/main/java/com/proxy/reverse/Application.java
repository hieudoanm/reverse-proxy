package com.proxy.reverse;

import io.helidon.webclient.api.HttpClientResponse;
import io.helidon.webclient.api.WebClient;
import io.helidon.webserver.WebServer;
import io.helidon.webserver.http.ServerRequest;
import io.helidon.webserver.http.ServerResponse;
import java.io.InputStream;
import java.io.OutputStream;

public class Application {
  public static void main(String[] args) {
    WebClient client = WebClient.builder().build();

    WebServer server =
        WebServer.builder()
            .port(8080)
            .routing(r -> r.get("/proxy", (req, res) -> handleProxy(req, res, client)))
            .build()
            .start();

    System.out.println("✅ Helidon Reverse Proxy running at http://localhost:" + server.port());
  }

  private static void handleProxy(ServerRequest req, ServerResponse res, WebClient client) {
    String targetUrl = req.query().first("url").orElse(null);

    if (targetUrl == null || targetUrl.isBlank()) {
      res.status(400).send("Missing 'url' query parameter");
      return;
    }

    try {
      HttpClientResponse response = client.get(targetUrl).request();
      InputStream input = response.inputStream();
      OutputStream output = res.outputStream();
      input.transferTo(output);
    } catch (Exception e) {
      res.status(500).send(e.getMessage());
    }
  }
}
