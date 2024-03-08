package user

import (
	"errors"
	"strconv"
)

// UserService cung cấp các dịch vụ liên quan đến người dùng
type UserService struct {
	userRepository *UserRepository
}

// NewUserService tạo một UserService mới
func NewUserService(repo *UserRepository) *UserService {
	return &UserService{userRepository: repo}
}

// GetAllUsers trả về tất cả người dùng từ repository
func (s *UserService) GetAllUsers() []User {
	return s.userRepository.GetAll()
}

// GetUserByID trả về người dùng với ID tương ứng
func (s *UserService) GetUserByID(userID int) (User, error) {
	users := s.userRepository.GetAll()
	for _, user := range users {
		if user.ID == userID {
			return user, nil
		}
	}
	return User{}, errors.New("User not found")
}

// CreateUser tạo một người dùng mới và lưu vào repository
func (s *UserService) CreateUser(name, email string) (User, error) {
	// Tìm ID lớn nhất trong danh sách người dùng hiện có và tăng thêm 1 để tạo ID mới
	users := s.userRepository.GetAll()
	maxID := 0
	for _, user := range users {
		if user.ID > maxID {
			maxID = user.ID
		}
	}
	newID := maxID + 1

	// Tạo người dùng mới và lưu vào repository
	newUser := User{ID: newID, Name: name, Email: email}
	s.userRepository.users = append(s.userRepository.users, newUser)

	return newUser, nil
}

// UpdateUser cập nhật thông tin của một người dùng trong repository
func (s *UserService) UpdateUser(userID int, name, email string) error {
	users := s.userRepository.GetAll()
	for i, user := range users {
		if user.ID == userID {
			// Cập nhật thông tin người dùng
			users[i].Name = name
			users[i].Email = email
			// Cập nhật lại repository
			s.userRepository.users = users
			return nil
		}
	}
	return errors.New("User not found")
}

// DeleteUser xóa một người dùng từ repository
func (s *UserService) DeleteUser(userID int) error {
	users := s.userRepository.GetAll()
	for i, user := range users {
		if user.ID == userID {
			// Xóa người dùng khỏi slice
			s.userRepository.users = append(users[:i], users[i+1:]...)
			return nil
		}
	}
	return errors.New("User not found")
}

// ValidateUserID kiểm tra xem chuỗi ID có hợp lệ không
func ValidateUserID(userID string) (int, error) {
	id, err := strconv.Atoi(userID)
	if err != nil {
		return 0, errors.New("Invalid user ID")
	}
	return id, nil
}
