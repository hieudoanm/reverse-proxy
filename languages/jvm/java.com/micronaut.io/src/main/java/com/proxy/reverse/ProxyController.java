package com.proxy.reverse;

import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import jakarta.inject.Inject;

@Controller("/proxy")
public class ProxyController {
  private final HttpClient httpClient;

  @Inject
  public ProxyController(@Client("/") HttpClient httpClient) {
    this.httpClient = httpClient;
  }

  @Get
  @ExecuteOn(TaskExecutors.BLOCKING) // ✅ run on worker thread
  public HttpResponse<?> proxy(@QueryValue String url) {
    if (url == null || url.isBlank()) {
      return HttpResponse.badRequest("Missing 'url' query parameter");
    }

    try {
      String body = httpClient.toBlocking().retrieve(url);
      return HttpResponse.ok(body);
    } catch (Exception e) {
      return HttpResponse.serverError("Failed to reach target: " + e.getMessage());
    }
  }
}
