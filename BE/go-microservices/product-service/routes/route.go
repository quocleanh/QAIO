package routes

import (
	"product-service/handlers" // import the handlers package

	"github.com/gin-gonic/gin" // import the gin library
)

// Đăng ký các route
func RegisterRoutes(router *gin.Engine) {

	// Đăng ký các route cho product-service
	// Product Management
	router.GET("/api/products", handlers.GetProducts)
	// router.GET("/api/products/:id", handlers.GetProduct)
	// router.POST("/api/products", utils.JWTMiddleware(handlers.CreateProduct))
	// router.PUT("/api/products/:id", utils.JWTMiddleware(handlers.UpdateProduct))
	// router.DELETE("/api/products/:id", utils.JWTMiddleware(handlers.DeleteProduct))

}
