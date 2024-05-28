package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Định nghĩa cấu trúc User
type User struct {
	ID           primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Email        string             `json:"email,omitempty" bson:"email,omitempty"`
	Password     string             `json:"password,omitempty" bson:"password,omitempty"`
	Name         string             `json:"name,omitempty" bson:"name,omitempty"`
	Age          int                `json:"age,omitempty" bson:"age,omitempty"`
	Address      string             `json:"address,omitempty" bson:"address,omitempty"`
	Phone        string             `json:"phone,omitempty" bson:"phone,omitempty"`
	Role         string             `json:"role,omitempty" bson:"role,omitempty"`
	Status       string             `json:"status,omitempty" bson:"status,omitempty"`
	Avatar       string             `json:"avatar,omitempty" bson:"avatar,omitempty"`
	ReferrerCode string             `json:"refereerCode,omitempty" bson:"refereerCode,omitempty"`
	Referrer     string             `json:"referrer,omitempty" bson:"referrer,omitempty"`
	RefreshToken string             `json:"refreshToken,omitempty" bson:"refreshToken,omitempty"`
	AccessToken  string             `json:"accessToken,omitempty" bson:"accessToken,omitempty"`
}
