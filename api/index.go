package main

import (
	"net/http"
	"net/http/httputil"
	"net/url"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	targetURL := r.URL.Query().Get("url")
	if targetURL == "" {
		http.Error(w, "Missing 'url' query parameter", http.StatusBadRequest)
		return
	}

	// Parse the target URL
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		http.Error(w, "Invalid URL: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Create a reverse proxy
	proxy := httputil.NewSingleHostReverseProxy(parsedURL)

	// Modify the request's host header to match the target URL
	r.Host = parsedURL.Host

	// Customize the proxy's director function if needed
	proxy.Director = func(req *http.Request) {
		req.URL.Scheme = parsedURL.Scheme
		req.URL.Host = parsedURL.Host
		req.URL.Path = parsedURL.Path
		req.Host = parsedURL.Host
	}

	// Serve the proxy
	proxy.ServeHTTP(w, r)
}