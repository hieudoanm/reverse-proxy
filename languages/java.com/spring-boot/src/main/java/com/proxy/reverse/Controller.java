package com.proxy.reverse;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@RestController
@RequestMapping("/api")
public class Controller {

    private final RestTemplate restTemplate = new RestTemplate();

    // ✅ Proxy GET request to target URL
    @GetMapping
    public ResponseEntity<?> proxyGet(@RequestParam String url) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.ALL));

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                byte[].class
        );

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(response.getHeaders().getContentType());

        return new ResponseEntity<>(response.getBody(), responseHeaders, response.getStatusCode());
    }

    // ✅ Proxy POST request to target URL with JSON body
    @PostMapping
    public ResponseEntity<?> proxyPost(@RequestParam String url, @RequestBody String body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        ResponseEntity<byte[]> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                byte[].class
        );

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.setContentType(response.getHeaders().getContentType());

        return new ResponseEntity<>(response.getBody(), responseHeaders, response.getStatusCode());
    }
}
