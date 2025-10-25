package com.proxy.reverse

import io.ktor.server.application.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import kotlinx.coroutines.*

fun main() {
  embeddedServer(Netty, port = 8080, host = "0.0.0.0") {
    module()
  }.start(wait = true)
}

fun Application.module() {
  val client = HttpClient(CIO)

  routing {
    route("/api") {
      handle {
        val targetUrl = call.request.queryParameters["url"]
          ?: return@handle call.respond(HttpStatusCode.BadRequest, "Missing 'url' query parameter")

        val method = call.request.httpMethod
        val requestHeaders = call.request.headers

        val proxiedResponse: HttpResponse = when (method) {
          HttpMethod.Get -> client.get(targetUrl) {
            headers {
              requestHeaders.forEach { key, values -> appendAll(key, values) }
            }
          }
          HttpMethod.Post -> {
            val requestBody = call.receiveText()
            client.post(targetUrl) {
              headers {
                requestHeaders.forEach { key, values -> appendAll(key, values) }
              }
              setBody(requestBody)
            }
          }
          else -> return@handle call.respond(HttpStatusCode.MethodNotAllowed, "Only GET and POST supported")
        }

        val responseBytes = proxiedResponse.body<ByteArray>()
        call.respondBytes(
          bytes = responseBytes,
          contentType = proxiedResponse.contentType(),
          status = proxiedResponse.status
        )
      }
    }
  }
}
