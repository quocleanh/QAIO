package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"go-rest-api/models"
	"go-rest-api/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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
