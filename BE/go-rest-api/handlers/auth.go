package handlers

import (
	"context"
	"encoding/json"
	"go-rest-api/models"
	"go-rest-api/utils"
	"net/http"
	"regexp"
	"strings"
	"unicode"

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

func emailExists(email string) (bool, error) {
	var user models.User
	err := usersCollection.FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err == mongo.ErrNoDocuments {
		return false, nil
	} else if err != nil {
		return false, err
	}
	return true, nil
}

// Hàm kiểm tra định dạng email
func isValidEmail(email string) bool {
	// Biểu thức chính quy cho định dạng email
	emailRegex := `^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$`
	re := regexp.MustCompile(emailRegex)
	return re.MatchString(email)
}

func isValidPhone(phone string) bool {
	phoneRegex := `^(09|03|07|08|05)\d{8}$`
	re := regexp.MustCompile(phoneRegex)
	return re.MatchString(phone)
}

// Hàm kiểm tra mật khẩu theo các quy tắc
func isValidPassword(password string) bool {
	if len(password) < 6 {
		return false // Mật khẩu ít nhất phải có 6 ký tự
	}

	hasUpper := false
	hasLower := false
	hasDigit := false

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsDigit(char):
			hasDigit = true
		}
	}

	return hasUpper && hasLower && hasDigit
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // Thiết lập Content-Type là JSON
	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid input",
			"msg_key": "_INVALID_INPUT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra các trường bắt buộc
	if user.Email == "" || user.Password == "" || user.Phone == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Email, Password, and Phone are required",
			"msg_key": "_REQUIRED_FIELDS_MISSING_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra định dạng email
	if !isValidEmail(user.Email) {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid email format",
			"msg_key": "_INVALID_EMAIL_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra xem email đã tồn tại chưa
	exists, err := emailExists(user.Email)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid phone number format",
			"msg_key": "_INVALID_PHONE_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}
	if exists {

		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "EMAIL_ALREADY_EXISTS",
			"msg_key": "_EMAIL_ALREADY_EXISTS_",
			"status":  http.StatusConflict,
		})
		return
	}
	// Kiểm tra định dạng số điện thoại
	if !isValidPhone(user.Phone) {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid phone number format",
			"msg_key": "_INVALID_PHONE_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra mật khẩu
	if !isValidPassword(user.Password) {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid password format. Password must be at least 6 characters long, contain at least 1 uppercase letter, 1 number, and 1 character [a-Z]",
			"msg_key": "_INVALID_PASSWORD_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	user.Password = string(hashedPassword)
	user.ID = primitive.NewObjectID()

	// Chỉ thêm các trường có giá trị vào cơ sở dữ liệu
	userData := bson.M{
		"_id":          user.ID,
		"email":        user.Email,
		"password":     user.Password,
		"name":         user.Name,
		"phone":        user.Phone,
		"status":       "InActive",
		"role":         "0",
		"dob":          nil,
		"address":      "",
		"avatar":       "",
		"referrerCode": "",
		"refreshToken": "",
		"accessToken":  "",
	}

	_, err = usersCollection.InsertOne(context.Background(), userData)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	filePath := "email_templates/welcome_email.html"
	// Đọc và thay thế nội dung HTML
	htmlContent, err := utils.HTMLFileContent(filePath)
	activeLink := "/kich-hoat-tai-khoan/"

	htmlContent = strings.Replace(htmlContent, "*|Name|*", user.Name, -1)
	htmlContent = strings.Replace(htmlContent, "*|activeLink|*", activeLink, -1)

	// Gửi email xác nhận đăng ký tài khoản
	emailSubject := "Đăng ký tài khoản"
	emailBody := htmlContent

	err = utils.SendMail(user.Email, emailSubject, emailBody)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     err,
			"msg_key": "_EMAIL_SEND_FAILURE_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	// Thành công
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"msg":     "REGISTER_SUCCESS",
		"msg_key": "_REGISTER_SUCCESS_",
		"status":  http.StatusCreated,
	})
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json") // Thiết lập Content-Type là JSON
	var creds models.User
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid input",
			"msg_key": "_INVALID_INPUT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	var user models.User
	err := usersCollection.FindOne(context.Background(), bson.M{"email": creds.Email}).Decode(&user)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid email or password",
			"msg_key": "_INVALID_CREDENTIALS_",
			"status":  http.StatusUnauthorized,
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     "Invalid email or password",
			"msg_key": "_INVALID_CREDENTIALS_",
			"status":  http.StatusUnauthorized,
		})
		return
	}

	_accessToken, _refreshToken, err := utils.GenerateTokens(user)

	user.RefreshToken = _refreshToken
	user.AccessToken = _accessToken
	user.Password = ""
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{
		"data": models.User{
			ID:           user.ID,
			Email:        user.Email,
			Name:         user.Name,
			Phone:        user.Phone,
			Avatar:       user.Avatar,
			AccessToken:  user.AccessToken,
			RefreshToken: user.RefreshToken,
			ReferrerCode: user.ReferrerCode,
			Status:       user.Status,
			Role:         user.Role,
		},
		"msg":     "LOGIN_SUCCESS",
		"msg_key": "_LOGIN_SUCCESS_",
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
