package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"

	beego "github.com/beego/beego/v2/server/web"
)

// ReverseProxyController handles proxying requests
type ReverseProxyController struct {
	beego.Controller
}

// Get handles the GET request for reverse proxy
func (c *ReverseProxyController) Get() {
	targetURL := c.GetString("target")

	if targetURL == "" {
		c.Ctx.ResponseWriter.WriteHeader(http.StatusBadRequest)
		c.Ctx.WriteString("Missing target query parameter")
		return
	}

	// Parse the target URL
	parsedURL, err := url.Parse(targetURL)
	if err != nil {
		c.Ctx.ResponseWriter.WriteHeader(http.StatusBadRequest)
		c.Ctx.WriteString("Invalid target URL: " + err.Error())
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
	proxy.ServeHTTP(c.Ctx.ResponseWriter, c.Ctx.Request)
}

func main() {
	// Register route and controller
	beego.Router("/proxy", &ReverseProxyController{})

	// Start the Beego server
	log.Println("Starting Beego server on :9000...")
	beego.Run(":9000")
}
