package routes

import (
	"common/utils"
	"user-service/handlers"

	"github.com/gin-gonic/gin"
)

// Đăng ký các route
func RegisterRoutes(router *gin.Engine) {

	router.GET("/api/user", utils.JWTMiddleware(handlers.GetUser))

}
