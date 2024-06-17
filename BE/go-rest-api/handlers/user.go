package handlers

import (
	"context"
	"go-rest-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
func UpdateUserInfo(c *gin.Context) {
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
	// Cập nhật thông tin người dùng
	var userUpdate models.User
	// Đọc dữ liệu từ request
	err = c.ShouldBindJSON(&userUpdate)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INVALID_REQUEST_",
			"status":  http.StatusOK,
		})
		return
	}
	// Cập nhật thông tin người dùng
	_, err = usersCollection.UpdateOne(
		context.Background(),
		bson.M{"_id": userID},
		bson.M{user.Name: userUpdate.Name, user.Phone: userUpdate.Phone, user.Address: userUpdate.Address, user.Avatar: userUpdate.Avatar},
	)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg":     err.Error(),
			"msg_key": "_UPDATE_USER_FAILED_",
			"status":  http.StatusOK,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"msg":     "SUCCESS",
		"msg_key": "_SUCCESS_",
		"status":  http.StatusOK,
	})
}

func ChangePassword(c *gin.Context) {
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
	var userUpdate models.User
	// Đọc dữ liệu từ request
	err = c.ShouldBindJSON(&userUpdate)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INVALID_REQUEST_",
			"status":  http.StatusOK,
		})
		return
	}
	// Cập nhật thông tin người dùng
	_, err = usersCollection.UpdateOne(
		context.Background(),
		bson.M{"_id": userID},
		bson.M{user.Password: userUpdate.Password},
	)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg":     err.Error(),
			"msg_key": "_UPDATE_USER_FAILED_",
			"status":  http.StatusOK,
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"msg":     "SUCCESS",
		"msg_key": "_SUCCESS_",
		"status":  http.StatusOK,
	})
}

// Hàm lưu RefreshToken vào cơ sở dữ liệu
func SaveTokens(userID primitive.ObjectID, refreshToken, accessToken string) error {
	// Thực hiện lưu RefreshToken và AccessToken vào cơ sở dữ liệu
	_, err := usersCollection.UpdateOne(
		context.Background(),
		bson.M{"_id": userID},
		bson.M{
			"$set": bson.M{
				"refreshToken": refreshToken,
				"accessToken":  accessToken,
			},
		},
	)
	return err
}
