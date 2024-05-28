package routes

import (
	"go-rest-api/handlers"
	"go-rest-api/utils"
	"net/http" // Nhập gói net/http

	"github.com/gorilla/mux"
)

// Đăng ký các route
func RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/api/signup", handlers.SignUp).Methods("POST")
	router.HandleFunc("/api/login", handlers.Login).Methods("POST")
	router.Handle("/api/user", utils.JWTMiddleware(http.HandlerFunc(handlers.GetUser))).Methods("GET")
}
