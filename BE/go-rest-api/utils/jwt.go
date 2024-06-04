package utils

import (
	"context"
	"go-rest-api/models"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Định nghĩa khóa context
type contextKey string

const userContextKey = contextKey("email")

// Middleware JWT để kiểm tra token
func JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Lấy token từ header Authorization
		tokenHeader := r.Header.Get("Authorization")
		if tokenHeader == "" {
			http.Error(w, "Thiếu token xác thực", http.StatusForbidden)
			return
		}

		// Tách token khỏi chuỗi Bearer
		tokenString := strings.Split(tokenHeader, "Bearer ")[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Token không hợp lệ", http.StatusForbidden)
			return
		}

		// Trích xuất email từ claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			http.Error(w, "Token không hợp lệ", http.StatusForbidden)
			return
		}

		email := claims["email"].(string)
		ctx := context.WithValue(r.Context(), userContextKey, email)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Lấy email từ context
func GetEmailFromContext(ctx context.Context) string {
	return ctx.Value(userContextKey).(string)
}

func GenerateTokens(user models.User) (string, string, error) {
	// Define the access token claims
	accessTokenClaims := jwt.MapClaims{
		"sub":     user.ID,
		"email":   user.Email,
		"name":    user.Name,
		"phone":   user.Phone,
		"address": user.Address,
		"status":  user.Status,
		"exp":     time.Now().Add(time.Hour * 24).Unix(), // Token expires in 1 day
	}
	accessToken, err := generateToken(accessTokenClaims)
	if err != nil {
		return "", "", err
	}

	// Define the refresh token claims
	refreshTokenClaims := jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 7).Unix(), // Token expires in 7 days
	}
	refreshToken, err := generateToken(refreshTokenClaims)
	if err != nil {
		return "", "", err
	}

	return accessToken, refreshToken, nil
}

// generateToken generates a JWT token with the given claims
func generateToken(claims jwt.Claims) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return "", err
	}
	return signedToken, nil
}

// Hàm lưu RefreshToken vào cơ sở dữ liệu
func SaveTokens(userID primitive.ObjectID, refreshToken, accessToken string) error {
	// Thực hiện lưu RefreshToken và AccessToken vào cơ sở dữ liệu

	return nil
}

// // Tạo JWT
// func GenerateJWT(email string, days int) (string, error) {
// 	// Tạo một token mới với các claim
// 	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
// 		"email": email,
// 		"exp":   time.Now().Add(time.Duration(days) * 24 * time.Hour).Unix(), // Thời gian hết hạn của token
// 	})

// 	// Ký và mã hóa token bằng JWT_SECRET
// 	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
// }
