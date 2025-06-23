package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
)

// ReverseProxy handles dynamic proxying
func ReverseProxy(c *gin.Context) {
	targetURL := c.Query("target")

	if targetURL == "" {
		c.String(http.StatusBadRequest, "Missing target query parameter")
		return
	}

	// Parse the target URL
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		c.String(http.StatusBadRequest, "Invalid target URL: "+err.Error())
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
	proxy.ServeHTTP(c.Writer, c.Request)
}

func main() {
	r := gin.Default()

	// Define the reverse proxy route
	r.GET("/proxy", ReverseProxy)

	// Start the server
	log.Println("Starting Gin server on :9000...")
	log.Fatal(r.Run(":9000"))
}
