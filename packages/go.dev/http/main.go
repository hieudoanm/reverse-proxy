package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
)

func main() {
	http.HandleFunc("/", HandleProxy)
	log.Println("Starting dynamic reverse proxy on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

// HandleProxy ...
func HandleProxy(w http.ResponseWriter, r *http.Request) {
	targetURL := r.URL.Query().Get("url")
	fmt.Println("targetURL: ", targetURL)
	if targetURL == "" {
		http.Error(w, "Missing 'url' query parameter", http.StatusBadRequest)
		return
	}

	// Parse the target URL
	parsedURL, err := url.Parse(targetURL)
	fmt.Println("parsedURL: ", parsedURL)
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
