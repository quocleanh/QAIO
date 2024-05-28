package utils

import (
	"context"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
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

// Tạo JWT
func GenerateJWT(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
