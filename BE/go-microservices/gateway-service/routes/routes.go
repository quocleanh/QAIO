package routes

import (
	"net/http"
	"net/url"
)

func proxyHandler(target string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Parse the target URL
		url, _ := url.Parse(target)

		// Create the reverse proxy
		proxy := http.NewServeMux()
		proxy.Handle("/", http.StripPrefix("/", http.RedirectHandler(url.String(), http.StatusTemporaryRedirect)))

		// Serve the request
		proxy.ServeHTTP(w, r)
	}
}

func SetupRoutes() {
	http.HandleFunc("/user/", proxyHandler("http://localhost:8081/"))
}
