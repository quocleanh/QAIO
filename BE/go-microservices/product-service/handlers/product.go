package handlers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var productsCollection *mongo.Collection

func InitProductsCollection(client *mongo.Client) {
	productsCollection = client.Database("go_rest_api").Collection("products")
	indexModel := mongo.IndexModel{
		Keys: bson.M{
			"No": 1,
		},
		Options: options.Index().SetUnique(true),
	}
	productsCollection.Indexes().CreateOne(context.Background(), indexModel)
}

// GetProducts lấy danh sách sản phẩm
func GetProducts(c *gin.Context) {
	c.Header("Content-Type", "application/json") // set the response content type as JSON

	c.JSON(http.StatusInternalServerError, gin.H{
		"msg":     "SUCCESS",
		"msg_key": "_SUCCESS_",
		"status":  http.StatusOK,
	})

}
