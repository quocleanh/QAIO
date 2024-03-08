package user

// UserRepository provides access to user data
type UserRepository struct {
	users []User
}

// NewUserRepository creates a new UserRepository
func NewUserRepository() *UserRepository {
	// Populate initial data
	users := []User{
		{ID: 1, Name: "John Doe", Email: "john@example.com"},
		{ID: 2, Name: "Jane Smith", Email: "jane@example.com"},
	}
	return &UserRepository{users: users}
}

// GetAll returns all users
func (r *UserRepository) GetAll() []User {
	return r.users
}
