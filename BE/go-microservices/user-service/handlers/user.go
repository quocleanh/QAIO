package handlers

import (
	"common/models"
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var usersCollection *mongo.Collection

// Khởi tạo usersCollection và tạo chỉ mục unique cho email
func InitUsersCollection(client *mongo.Client) {
	usersCollection = client.Database("go_rest_api").Collection("users")
	indexModel := mongo.IndexModel{
		Keys: bson.M{
			"email": 1,
		},
		Options: options.Index().SetUnique(true),
	}
	usersCollection.Indexes().CreateOne(context.Background(), indexModel)
}
func GetUser(c *gin.Context) {

	c.Header("Content-Type", "application/json") // Thiết lập Content-Type là JSON
	userIDString, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "USERid not found in context",
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	// Tìm người dùng trong MongoDB
	var user models.User
	userID, err := primitive.ObjectIDFromHex(userIDString.(string))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	err = usersCollection.FindOne(context.Background(), bson.M{"_id": userID}).Decode(&user)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg":     err.Error(),
			"msg_key": "_NOT_FOUND_USER_",
			"status":  http.StatusOK,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": models.User{
			ID:           user.ID,
			Email:        user.Email,
			Name:         user.Name,
			Phone:        user.Phone,
			Avatar:       user.Avatar,
			Address:      user.Address,
			AccessToken:  user.AccessToken,
			RefreshToken: user.RefreshToken,
			ReferrerCode: user.ReferrerCode,
			Status:       user.Status,
			DoB:          user.DoB,
			Role:         user.Role,
		},
		"msg":     "SUCCESS",
		"msg_key": "_SUCCESS_",
		"status":  http.StatusOK,
	})
}
