// handlers/product.go

package handlers

import (
	"context"
	"net/http"
	"os"
	"strconv"

	"go-rest-api/repositories"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type ProductHandler struct {
	Repo *repositories.ProductRepository
}

var productsCollection *mongo.Collection

// Khởi tạo InitProductsCollection và tạo chỉ mục unique cho email
func InitProductsCollection(client *mongo.Client) {
	productsCollection = client.Database(os.Getenv("MONGO_DB_NAME")).Collection("products")
	indexModel := mongo.IndexModel{
		Keys: bson.M{
			"_id": 1,
		},
		Options: options.Index().SetUnique(true),
	}
	//productsCollection.Indexes().CreateOne(context.Background(), indexModel)

	_, err := productsCollection.Indexes().CreateOne(context.Background(), indexModel)
	if err != nil {

		return
	}

}

func GetProducts(c *gin.Context) {
	c.Header("Content-Type", "application/json")

	pageSizeStr := c.Query("take")
	pageIndexStr := c.Query("skip")

	pageIndex, err := strconv.ParseInt(pageIndexStr, 10, 64)
	if err != nil || pageIndex < 1 {
		pageIndex = 1
	}

	pageSize, err := strconv.ParseInt(pageSizeStr, 10, 64)
	if err != nil || pageSize <= 0 {
		pageSize = 100
	} else if pageSize > 100 {
		pageSize = 100
	}

	skip := (pageIndex - 1) * pageSize

	var products *mongo.Cursor
	products, err = productsCollection.Find(context.Background(), bson.M{}, &options.FindOptions{
		Skip:  &skip,
		Limit: &pageSize,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  "500",
		})
		return
	}
	defer products.Close(context.Background())

	var productList []bson.M
	if err = products.All(context.Background(), &productList); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  "500",
		})
		return
	}

	totalRecord, err := productsCollection.CountDocuments(context.Background(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Internal Server Error",
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  "500",
		})
		return
	}

	productResponse := gin.H{
		"skip":         pageIndex,
		"take":         pageSize,
		"totalRecords": totalRecord,
		"products":     productList,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Success",
		"msg_key": "_SUCCESS_",
		"status":  "200",
		"data":    productResponse,
	})
}
