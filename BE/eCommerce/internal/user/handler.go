package user

import (
	"encoding/json"
	"net/http"
)

// HandleUsers handles user-related requests
func HandleUsers(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		getUsers(w, r)
	// Handle other methods like POST, PUT, DELETE
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	// Get users from repository
	users := []User{
		{ID: 1, Name: "John Doe", Email: "john@example.com"},
		{ID: 2, Name: "Jane Smith", Email: "jane@example.com"},
	}

	// Convert to JSON and send response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}
