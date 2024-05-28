package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"go-rest-api/models"
	"go-rest-api/utils"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
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

// Xử lý đăng ký người dùng
func SignUp(w http.ResponseWriter, r *http.Request) {
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	log.Printf("Received SignUp request: %+v\n", user)

	// Mã hóa mật khẩuz
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = string(hashedPassword)
	user.ID = primitive.NewObjectID()

	// Chèn người dùng vào MongoDB
	_, err = usersCollection.InsertOne(context.Background(), user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

// Xử lý đăng nhập người dùng
func Login(w http.ResponseWriter, r *http.Request) {
	var creds models.User
	_ = json.NewDecoder(r.Body).Decode(&creds)

	var user models.User
	// Tìm người dùng trong MongoDB
	err := usersCollection.FindOne(context.Background(), bson.M{"email": creds.Email}).Decode(&user)
	if err != nil {
		http.Error(w, "Email hoặc mật khẩu không chính xác", http.StatusUnauthorized)
		return
	}

	// So sánh mật khẩu
	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
	if err != nil {
		http.Error(w, "Email hoặc mật khẩu không chính xác", http.StatusUnauthorized)
		return
	}

	// Tạo JWT
	token, err := utils.GenerateJWT(user.Email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
