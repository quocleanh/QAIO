package routes

import (
	"auth-service/handlers"
	"common/utils"

	"github.com/gin-gonic/gin"
)

// Đăng ký các route
func RegisterRoutes(router *gin.Engine) {
	// User 
	router.POST("/api/signup", handlers.SignUp)
	router.POST("/api/login", handlers.Login)
	router.GET("/api/user/refreshtoken", utils.JWTMiddleware(handlers.RefreshToken))

}
