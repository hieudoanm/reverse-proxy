package com.example

import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.features.CallLogging
import io.ktor.http.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import kotlinx.coroutines.*

fun main(args: Array<String>) = EngineMain.main(args)

fun Application.module() {
    install(CallLogging)

    val client = HttpClient(CIO)

    routing {
        /**
         * Reverse api endpoint:
         * GET /api?url=https://example.com
         * POST /api?url=https://example.com
         */
        route("/api") {
            handle {
                val targetUrl = call.request.queryParameters["url"]
                    ?: return@handle call.respond(HttpStatusCode.BadRequest, "Missing 'url' query parameter")

                val method = call.request.httpMethod
                val requestHeaders = call.request.headers

                val proxiedResponse: HttpResponse = if (method == HttpMethod.Get) {
                    client.get(targetUrl) {
                        headers {
                            requestHeaders.forEach { key, values -> appendAll(key, values) }
                        }
                    }
                } else if (method == HttpMethod.Post) {
                    val requestBody = call.receiveText()
                    client.post(targetUrl) {
                        headers {
                            requestHeaders.forEach { key, values -> appendAll(key, values) }
                        }
                        setBody(requestBody)
                    }
                } else {
                    return@handle call.respond(HttpStatusCode.MethodNotAllowed, "Only GET and POST supported")
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
