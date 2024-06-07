package utils

import (
	"common/models"
	"context"
	"net/http"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// Định nghĩa khóa context
type contextKey string

const userContextKey = contextKey("sub")

// Middleware JWT để kiểm tra token
func JWTMiddleware(handler gin.HandlerFunc, checkExpiry bool) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Kiểm tra JWT ở đây
		// Ví dụ: kiểm tra token từ header và validate nó
		tokenString := c.GetHeader("Authorization")

		// Thực hiện kiểm tra token ở đây (bỏ qua code thực tế)
		if isValidToken(tokenString, checkExpiry) {
			handler(c)
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
		}
	}
}
func isValidToken(tokenString string, checkExpiry bool) bool {
	// Giả sử đây là hàm kiểm tra tính hợp lệ của token
	return true
}

// Lấy email từ context
func GetUserIDFromContext(ctx context.Context) string {
	return ctx.Value(userContextKey).(string)
}

func GenerateTokens(user models.User) (string, string, error) {
	// Define the access token claims
	accessTokenClaims := jwt.MapClaims{
		"sub":     user.ID,
		"iat":     time.Now().Unix(),
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
		"sub":     user.ID,
		"iat":     time.Now().Unix(),
		"email":   user.Email,
		"name":    user.Name,
		"phone":   user.Phone,
		"address": user.Address,
		"status":  user.Status,
		"exp":     time.Now().Add(time.Hour * 24 * 7).Unix(), // Token expires in 7 days
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
