package routes

import (
	"auth-service/handlers"

	"github.com/gin-gonic/gin"
)

// Đăng ký các route
func RegisterRoutes(router *gin.Engine) {
	// User
	router.POST("/api/signup", gin.WrapF(handlers.SignUp))
	router.POST("/api/login", gin.WrapF(handlers.Login))
	// router.GET("/api/user", utils.JWTMiddleware(handlers.GetUser, true))
	//router.GET("/api/user/refreshtoken", utils.JWTMiddleware(handlers.RefreshToken, false)) // Không kiểm tra thời gian hết hạn, chỉ kiểm tra tính hợp lệ của token

}
