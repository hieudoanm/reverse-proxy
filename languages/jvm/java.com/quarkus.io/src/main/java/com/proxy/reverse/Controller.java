package com.proxy.reverse;

import io.smallrye.mutiny.Uni;
import io.vertx.mutiny.core.MultiMap;
import io.vertx.mutiny.core.buffer.Buffer;
import io.vertx.mutiny.ext.web.client.HttpResponse;
import io.vertx.mutiny.ext.web.client.WebClient;
import io.vertx.ext.web.client.WebClientOptions;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

@Path("/proxy")
@ApplicationScoped
public class Controller {
  private static final Logger LOG = Logger.getLogger(Controller.class);

  @Inject
  io.vertx.mutiny.core.Vertx vertx;

  private WebClient client;

  @PostConstruct
  void init() {
    WebClientOptions options = new WebClientOptions()
      .setFollowRedirects(false)
      .setIdleTimeout(30);
    client = WebClient.create(vertx, options);
  }

  @GET
  @Produces(MediaType.WILDCARD)
  public Uni<Response> proxyGet(@QueryParam("url") String url) {
    if (url == null || url.isBlank()) {
      return Uni.createFrom().item(Response.status(Response.Status.BAD_REQUEST)
        .entity("Missing 'url' query parameter").build());
    }

    return client.getAbs(url)
      .send()
      .onItem().transform(this::toResponse)
      .onFailure().recoverWithItem(err -> {
        LOG.error("Proxy request failed", err);
        return Response.status(Response.Status.BAD_GATEWAY)
          .entity("Failed to reach target URL: " + err.getMessage())
          .build();
      });
  }

  private Response toResponse(HttpResponse<Buffer> resp) {
    Response.ResponseBuilder builder = Response.status(resp.statusCode());
    MultiMap headers = resp.headers();

    for (Map.Entry<String, String> e : headers.entries()) {
      String name = e.getKey().toLowerCase(Locale.ROOT);
      if (!List.of("connection", "transfer-encoding", "keep-alive", "host").contains(name)) {
        builder.header(e.getKey(), e.getValue());
      }
    }

    if (resp.body() != null) {
      builder.entity(resp.bodyAsBuffer().getBytes());
    }
    return builder.build();
  }
}
