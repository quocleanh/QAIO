package handlers

import (
	"common/models"
	"common/utils"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"regexp"
	"strings"
	"unicode"

	"github.com/gin-gonic/gin"
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

func SignUp(c *gin.Context) {

	c.Header("Content-Type", "application/json") // Thiết lập Content-Type là JSON
	var user models.User
	if err := json.NewDecoder(c.Request.Body).Decode(&user); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid input",
			"msg_key": "_INVALID_INPUT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra các trường bắt buộc
	if user.Email == "" || user.Password == "" || user.Phone == "" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Email, Password, and Phone are required",
			"msg_key": "_REQUIRED_FIELDS_MISSING_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra định dạng email
	if !isValidEmail(user.Email) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid email format",
			"msg_key": "_INVALID_EMAIL_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra xem email đã tồn tại chưa
	exists, err := emailExists(user.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid phone number format",
			"msg_key": "_INVALID_PHONE_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}
	if exists {

		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "EMAIL_ALREADY_EXISTS",
			"msg_key": "_EMAIL_ALREADY_EXISTS_",
			"status":  http.StatusConflict,
		})
		return
	}
	// Kiểm tra định dạng số điện thoại
	if !isValidPhone(user.Phone) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid phone number format",
			"msg_key": "_INVALID_PHONE_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	// Kiểm tra mật khẩu
	if !isValidPassword(user.Password) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid password format. Password must be at least 6 characters long, contain at least 1 uppercase letter, 1 number, and 1 character [a-Z]",
			"msg_key": "_INVALID_PASSWORD_FORMAT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
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
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	filePath := "email_templates/welcome_email.html"
	//Đọc và thay thế nội dung HTML
	htmlContent, err := utils.HTMLFileContent(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	activeLink := "/kich-hoat-tai-khoan/"

	htmlContent = strings.Replace(htmlContent, "*|Name|*", user.Name, -1)
	htmlContent = strings.Replace(htmlContent, "*|activeLink|*", activeLink, -1)

	// Gửi email xác nhận đăng ký tài khoản
	emailSubject := fmt.Sprintf("%s %s", os.Getenv("product_name"), "Activate Your Account")
	emailBody := htmlContent

	go utils.SendMail(user.Email, emailSubject, emailBody)

	// Thành công
	c.JSON(http.StatusOK, gin.H{
		"msg":     "REGISTER_SUCCESS",
		"msg_key": "_REGISTER_SUCCESS_",
		"status":  http.StatusCreated,
	})
}

func Login(c *gin.Context) {
	c.Header("Content-Type", "application/json") // Thiết lập Content-Type là JSON
	var creds models.User
	if err := json.NewDecoder(c.Request.Body).Decode(&creds); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid input",
			"msg_key": "_INVALID_INPUT_",
			"status":  http.StatusBadRequest,
		})
		return
	}

	var user models.User
	err := usersCollection.FindOne(
		context.Background(),
		bson.M{"email": creds.Email}).Decode(&user)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid email or password",
			"msg_key": "_INVALID_CREDENTIALS_",
			"status":  http.StatusUnauthorized,
		})
		return
	}
	if user.Status == "InActive" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Account is inactive",
			"msg_key": "_ACCOUNT_INACTIVE_",
			"status":  http.StatusUnauthorized,
		})
		return
	} else if user.Status == "Blocked" {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Account is blocked",
			"msg_key": "_ACCOUNT_BLOCKED_",
			"status":  http.StatusUnauthorized,
		})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     "Invalid email or password",
			"msg_key": "_INVALID_CREDENTIALS_",
			"status":  http.StatusUnauthorized,
		})
		return
	}
	_accessToken, _refreshToken, err := utils.GenerateTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	user.RefreshToken = _refreshToken
	user.AccessToken = _accessToken

	//Luu 2 cái token củ lol đó vô DB
	err = SaveTokens(user.ID, _accessToken, _refreshToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}
	c.JSON(http.StatusInternalServerError, gin.H{
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
		"msg":     "LOGIN_SUCCESS",
		"msg_key": "_LOGIN_SUCCESS_",
		"status":  http.StatusOK,
	})
}
func RefreshToken(c *gin.Context) {

	//khi gọi hàm này truyền tiken vào để lấy token mới, luuw cả 2 về client

	c.Header("Content-Type", "application/json") // Thiết lập Content-Type là JSON
	// Lấy USERid từ context (được thiết lập bởi middleware)
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
	// Tạo token nếu khớp thông tin
	accessToken, refreshToken, err := utils.GenerateTokens(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	// Lưu token mới
	err = SaveTokens(user.ID, accessToken, refreshToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INTERNAL_SERVER_ERROR_",
			"status":  http.StatusInternalServerError,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": map[string]string{
			"accessToken":  accessToken,
			"refreshToken": refreshToken,
		},
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
