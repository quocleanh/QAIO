package main

import (
	"fmt"
	"gateway-service/routes"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	routes.SetupRoutes()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Gateway Service running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
