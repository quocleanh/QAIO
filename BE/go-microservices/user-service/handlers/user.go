package handlers

import (
	"common/models"
	"common/utils"
	"context"
	"encoding/json"
	"net/http"

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

// Xử lý yêu cầu lấy thông tin người dùng
func GetUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json") // Thiết lập Content-Type là JSON

	// Lấy USERid từ context (được thiết lập bởi middleware)
	userIDString := utils.GetUserIDFromContext(r.Context())

	// Tìm người dùng trong MongoDB
	var user models.User
	userID, err := primitive.ObjectIDFromHex(userIDString)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	err = usersCollection.FindOne(context.Background(), bson.M{"_id": userID}).Decode(&user)

	if err != nil {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     err.Error(),
			"msg_key": "_NOT_FOUND_USER_",
			"status":  http.StatusOK,
		})
		return
	}

	// Trả về thông tin người dùng
	json.NewEncoder(w).Encode(map[string]interface{}{
		"data": models.UserResponse{
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
