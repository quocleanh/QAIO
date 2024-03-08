package main

import (
	"eCommerce/internal/user"
	"fmt"
	"net/http"
)

func main() {
	// Setup routes
	http.HandleFunc("/users", user.HandleUsers)

	// Start server
	fmt.Println("Server is running on :8080")
	http.ListenAndServe(":8080", nil)
}
