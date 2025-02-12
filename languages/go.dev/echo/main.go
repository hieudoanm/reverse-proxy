package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/labstack/echo/v4"
)

// ReverseProxy handles dynamic proxying
func ReverseProxy(c echo.Context) error {
	targetURL := c.QueryParam("target")

	if targetURL == "" {
		return c.String(http.StatusBadRequest, "Missing target query parameter")
	}

	// Parse the target URL
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		return c.String(http.StatusBadRequest, "Invalid target URL: "+err.Error())
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
	proxy.ServeHTTP(c.Response(), c.Request())

	return nil
}

func main() {
	e := echo.New()

	// Define the reverse proxy route
	e.GET("/proxy", ReverseProxy)

	// Start the server
	log.Println("Starting server on :9000...")
	log.Fatal(e.Start(":9000"))
}
