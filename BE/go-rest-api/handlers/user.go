package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"go-rest-api/models"
	"go-rest-api/utils"

	"go.mongodb.org/mongo-driver/bson"
)

// Xử lý yêu cầu lấy thông tin người dùng
func GetUser(w http.ResponseWriter, r *http.Request) {
	// Lấy email từ context (được thiết lập bởi middleware)
	email := utils.GetEmailFromContext(r.Context())

	// Tìm người dùng trong MongoDB
	var user models.User
	err := usersCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		http.Error(w, "Không tìm thấy người dùng", http.StatusNotFound)
		return
	}

	// Trả về thông tin người dùng
	json.NewEncoder(w).Encode(user)
}
