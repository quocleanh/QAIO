package utils

import (
	"common/models"
	"context"
	"log"
	"net/http"
	"os"
	"strings"
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
		if isValidToken(c, tokenString, checkExpiry) {
			handler(c)
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
		}
	}
}
func isValidToken(c *gin.Context, tokenHeader string, checkExpiry bool) bool {
	// Kiểm tra token header
	if tokenHeader == "" {
		log.Println("Invalid token: empty token header")
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg":     "_INVALID_TOKEN_",
			"msg_key": "_INVALID_TOKEN_",
			"status":  http.StatusUnauthorized,
		})
		return false
	}

	// Tách token khỏi chuỗi Bearer
	tokenParts := strings.Split(tokenHeader, "Bearer ")
	if len(tokenParts) != 2 {
		log.Println("Invalid token: malformed token header")
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg":     "_INVALID_TOKEN_",
			"msg_key": "_INVALID_TOKEN_",
			"status":  http.StatusUnauthorized,
		})
		return false
	}
	tokenString := tokenParts[1]

	// Parse token
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		log.Printf("Invalid token: %v\n", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg":     err.Error(),
			"msg_key": "_INVALID_TOKEN_",
			"status":  http.StatusUnauthorized,
		})
		return false
	}

	// Trích xuất claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		log.Println("Invalid token: unable to extract claims")
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg":     "_INVALID_TOKEN_",
			"msg_key": "_INVALID_TOKEN_",
			"status":  http.StatusUnauthorized,
		})
		return false
	}

	// Kiểm tra thời hạn của token nếu cần
	if checkExpiry {
		tokenExp := time.Unix(int64(claims["exp"].(float64)), 0)
		currentTime := time.Now()
		if !tokenExp.After(currentTime) {
			log.Println("Invalid token: token has expired")
			c.JSON(http.StatusUnauthorized, gin.H{
				"msg":     "_EXPIRED_TOKEN_",
				"msg_key": "_EXPIRED_TOKEN_",
				"status":  http.StatusUnauthorized,
			})
			return false
		}
	}

	// Lấy userID từ claims
	userID := claims["sub"].(string)

	// Thiết lập userID vào context
	c.Set("userID", userID)

	return true
}

// Lấy email từ context
func GetUserIDFromContext(ctx context.Context) string {
	return ctx.Value(userContextKey).(string)
}
func GenerateTokens(user models.User, isRefresh bool) (string, string, error) {
	var accessToken string
	var refreshToken string
	var err error
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
	accessToken, err = generateToken(accessTokenClaims)
	if err != nil {
		logError("Error generating access token: " + err.Error())
		return "", "", err
	}
	// Nếu refresh token, tạo access token mới, ko tạo refresh
	if isRefresh {

		refreshToken = user.RefreshToken

	} else {
		// Định nghĩa các claims cho refresh token
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
		refreshToken, err = generateToken(refreshTokenClaims)
		if err != nil {
			logError("Error generating refresh token: " + err.Error())
			return "", "", err
		}
	}

	return accessToken, refreshToken, nil
}

func logError(message string) {
	// Thay thế bằng cơ chế log của bạn, ví dụ logrus, zap, hoặc đơn giản là log chuẩn của Go
	log.Println("ERROR: " + message)
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
