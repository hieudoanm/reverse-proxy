package main

import (
	"io"
	"log"
	"net/http"
	"net/url"

	"github.com/go-chi/chi/v5"
)

func main() {
	r := chi.NewRouter()

	r.Get("/proxy", func(w http.ResponseWriter, r *http.Request) {
		targetURL := r.URL.Query().Get("url")
		if targetURL == "" {
			http.Error(w, "Missing 'url' query parameter", http.StatusBadRequest)
			return
		}

		parsedURL, err := url.Parse(targetURL)
		if err != nil || !parsedURL.IsAbs() {
			http.Error(w, "Invalid URL", http.StatusBadRequest)
			return
		}

		req, err := http.NewRequestWithContext(r.Context(), http.MethodGet, parsedURL.String(), nil)
		if err != nil {
			http.Error(w, "Failed to create request", http.StatusInternalServerError)
			return
		}

		// Copy headers from original request (optional)
		// for k, v := range r.Header {
		// 	req.Header[k] = v
		// }

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			http.Error(w, "Request failed: "+err.Error(), http.StatusBadGateway)
			return
		}
		defer resp.Body.Close()

		// Copy status and headers
		w.WriteHeader(resp.StatusCode)
		for k, v := range resp.Header {
			w.Header()[k] = v
		}

		// Copy body
		io.Copy(w, resp.Body)
	})

	log.Println("Listening on http://localhost:3000")
	http.ListenAndServe(":3000", r)
}
