package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Định nghĩa cấu trúc User với các trường bắt buộc
type User struct {
	ID           primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email        string             `json:"email" bson:"email"`         // Trường bắt buộc
	Password     string             `json:"password" bson:"password"`   // Trường bắt buộc
	Name         string             `json:"name,omitempty" bson:"name"` // Trường bắt buộc
	DoB          primitive.DateTime `json:"dob,omitempty" bson:"dob,omitempty"`
	Address      string             `json:"address,omitempty" bson:"address,omitempty"`
	Phone        string             `json:"phone,omitempty" bson:"phone"` // Trường bắt buộc
	Role         string             `json:"role,omitempty" bson:"role,omitempty"`
	Status       string             `json:"status,omitempty" bson:"status,omitempty"`
	Avatar       string             `json:"avatar,omitempty" bson:"avatar,omitempty"`
	ReferrerCode string             `json:"referrerCode,omitempty" bson:"referrerCode,omitempty"`
	Referrer     string             `json:"referrer,omitempty" bson:"referrer,omitempty"`
	RefreshToken string             `json:"refreshToken,omitempty" bson:"refreshToken,omitempty"`
	AccessToken  string             `json:"accessToken,omitempty" bson:"accessToken,omitempty"`
}
