package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gorilla/mux"
)

// ReverseProxy handles dynamic proxying
func ReverseProxy(w http.ResponseWriter, r *http.Request) {
	targetURL := r.URL.Query().Get("target")

	if targetURL == "" {
		http.Error(w, "Missing target query parameter", http.StatusBadRequest)
		return
	}

	// Parse the target URL
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		http.Error(w, "Invalid target URL", http.StatusBadRequest)
		return
	}

	// Create a reverse proxy
	proxy := httputil.NewSingleHostReverseProxy(parsedURL)

	// Modify the request before forwarding
	proxy.Director = func(req *http.Request) {
		req.URL.Scheme = parsedURL.Scheme
		req.URL.Host = parsedURL.Host
		req.Host = parsedURL.Host
		req.URL.Path = parsedURL.Path
	}

	// Serve the proxied request
	proxy.ServeHTTP(w, r)
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/proxy", ReverseProxy).Methods("GET")

	log.Println("Starting server on :9000...")
	log.Fatal(http.ListenAndServe(":9000", r))
}
