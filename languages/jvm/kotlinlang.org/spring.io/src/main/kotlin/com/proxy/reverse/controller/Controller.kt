package com.proxy.reverse.controller

import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.reactive.function.client.*
import org.springframework.http.server.reactive.ServerHttpRequest
import reactor.core.publisher.Mono

@RestController
class Controller(
    private val webClientBuilder: WebClient.Builder
) {

    private val webClient: WebClient by lazy {
        webClientBuilder.build() // no baseUrl; dynamic per request
    }

    @RequestMapping("/proxy", method = [RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH])
    fun proxy(
        @RequestParam("url") targetUrl: String,
        request: ServerHttpRequest,
        @RequestBody(required = false) body: Mono<String>
    ): Mono<ResponseEntity<String>> {
        val method = request.method ?: HttpMethod.GET

        return webClient
            .method(method)
            .uri(targetUrl)
            .body(body, String::class.java)
            .retrieve()
            .toEntity(String::class.java)
    }
}
