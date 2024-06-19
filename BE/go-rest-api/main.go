// main.go

package main

import (
	"context"
	"fmt"
	"go-rest-api/handlers"
	"go-rest-api/repositories"
	"go-rest-api/routes"
	"go-rest-api/utils"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func main() {
	// Tải các biến môi trường từ file .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Lỗi khi tải file .env")
	}

	// Kết nối tới MongoDB
	clientOptions := options.Client().ApplyURI(os.Getenv("MONGO_URI"))
	client, err = mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	// Kiểm tra kết nối MongoDB
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Đã kết nối tới MongoDB!")

	// Kết nối tới SQL Server
	db, err := utils.ConnectSQLServer(os.Getenv("SQL_SERVER_URI"))
	if err != nil {
		log.Fatal("Cannot connect to database:", err)
	}
	defer db.Close()

	log.Println("Connected to database successfully")

	// Kiểm tra kết nối SQL Server
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	// Tạo ProductRepository và ProductHandler
	productRepo := repositories.NewProductRepository(db)
	productHandler := handlers.NewProductHandler(productRepo)

	// Cấu hình router
	router := gin.Default()
	routes.RegisterRoutes(router, productHandler)

	// Cấu hình và chạy server
	srv := &http.Server{
		Handler:      router,
		Addr:         "0.0.0.0:8081",
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
