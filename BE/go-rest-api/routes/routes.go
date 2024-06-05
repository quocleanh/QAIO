package routes

import (
	"go-rest-api/handlers"
	"go-rest-api/utils"
	"net/http" // Nhập gói net/http

	"github.com/gorilla/mux"
)

// Đăng ký các route
func RegisterRoutes(router *mux.Router) {
	/// User
	router.HandleFunc("/api/signup", handlers.SignUp).Methods("POST")
	router.HandleFunc("/api/login", handlers.Login).Methods("POST")
	router.Handle("/api/user", utils.JWTMiddleware(http.HandlerFunc(handlers.GetUser), true)).Methods("GET")
	router.Handle("/api/user/refreshtoken", utils.JWTMiddleware(http.HandlerFunc(handlers.RefreshToken), false)).Methods("GET") // Không kiểm tra thời gian hết hạn, chỉ kiểm tra tính hợp lệ của token

	///Other
}
