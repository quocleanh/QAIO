package routes

import (
	"go-rest-api/handlers" // import the handlers package
	"go-rest-api/utils"

	"github.com/gin-gonic/gin" // import the gin library
)

// Đăng ký các route
func RegisterRoutes(router *gin.Engine,productHandler *handlers.ProductHandler) {

	// User Authentication and Authorization
	router.POST("/api/signup", handlers.SignUp)
	router.POST("/api/login", handlers.Login)
	router.GET("/api/user/refresh-token", utils.JWTMiddleware(handlers.RefreshToken))

	// User Profile Management
	router.GET("/api/user", utils.JWTMiddleware(handlers.GetUser))
	router.PUT("/api/user", utils.JWTMiddleware(handlers.UpdateUserInfo))
	router.PUT("/api/user/change-password", utils.JWTMiddleware(handlers.ChangePassword))

	// Password Management
	router.POST("/api/forget-password", handlers.ForgetPassword)
	router.POST("/api/reset-password", utils.JWTMiddleware(handlers.ResetPassword))

	// Product Management 
	router.GET("/api/products", productHandler.GetProducts)

}
