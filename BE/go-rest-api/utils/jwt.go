package utils

import (
	"context"
	"encoding/json"
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

const userContextKey = contextKey("sub")

// Middleware JWT để kiểm tra token
func JWTMiddleware(next http.Handler, IsCheckExpired bool) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Lấy token từ header Authorization
		tokenHeader := r.Header.Get("Authorization")
		if tokenHeader == "" {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"msg":     "_INVALID_TOKEN_",
				"msg_key": "_INVALID_TOKEN_",
				"status":  http.StatusUnauthorized,
			})
			return
		}

		// Tách token khỏi chuỗi Bearer
		tokenString := strings.Split(tokenHeader, "Bearer ")[1]
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil || !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"msg":     err.Error(),
				"msg_key": "_INVALID_TOKEN_",
				"status":  http.StatusUnauthorized,
			})
			return
		}

		// Trích xuất email từ claims
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok || !token.Valid {
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"msg":     err.Error(),
				"msg_key": "_INVALID_TOKEN_",
				"status":  http.StatusUnauthorized,
			})
			return
		}
		if IsCheckExpired {
			tokenExp := time.Unix(int64(claims["exp"].(float64)), 0)
			currentTime := time.Now()
			if !tokenExp.After(currentTime) {
				w.WriteHeader(http.StatusUnauthorized)
				json.NewEncoder(w).Encode(map[string]interface{}{
					"msg":     "_EXPIED_TOKEN_",
					"msg_key": "_EXPIED_TOKEN_",
					"status":  http.StatusUnauthorized,
				})
			}

		}

		userID := claims["sub"].(string)
		ctx := context.WithValue(r.Context(), userContextKey, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// Lấy email từ context
func GetUserIDFromContext(ctx context.Context) string {
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
