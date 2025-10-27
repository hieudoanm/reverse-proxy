package io.proxy.reverse.controller;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import jakarta.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;

/**
 * A simple proxy controller that retrieves the content of a given URL.
 * Runs on a blocking thread pool to avoid blocking the event loop.
 */
@Controller("/proxy")
public class ProxyController {

  private static final Logger LOG = LoggerFactory.getLogger(ProxyController.class);

  private final HttpClient httpClient;

  @Inject
  public ProxyController(@Client("/") HttpClient httpClient) {
    this.httpClient = httpClient;
  }

  @Get
  @ExecuteOn(TaskExecutors.BLOCKING) // ✅ Run on worker thread
  public HttpResponse<?> proxy(@QueryValue String url) {
    if (url == null || url.isBlank()) {
      return HttpResponse.badRequest("Missing 'url' query parameter");
    }

    try {
      // ✅ Validate and sanitize the provided URL
      URI targetUri = URI.create(url);
      if (!("http".equalsIgnoreCase(targetUri.getScheme()) ||
        "https".equalsIgnoreCase(targetUri.getScheme()))) {
        return HttpResponse.badRequest("Invalid URL scheme — only http/https allowed");
      }

      String body = httpClient.toBlocking().retrieve(String.valueOf(targetUri));
      return HttpResponse.ok(body);

    } catch (IllegalArgumentException e) {
      LOG.warn("Invalid URL: {}", url, e);
      return HttpResponse.badRequest("Invalid URL: " + e.getMessage());
    } catch (Exception e) {
      LOG.error("Failed to reach target: {}", url, e);
      return HttpResponse.serverError("Failed to reach target: " + e.getMessage());
    }
  }
}
