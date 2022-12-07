package models

import (
	"time"
)

type User struct {
	ID        uint   `json:"id" gorm:"primary_key"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	School    string `json:"school"`
	Password  string `json:"password"`
	Verified  bool   `gorm:"not null"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

type SignUpInput struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	School   string `json:"school"`
	Password string `json:"password"`
}

type SignInInput struct {
	Email    string `json:"email"  binding:"required"`
	Password string `json:"password"  binding:"required"`
}

type UserResponse struct {
	ID     uint   `json:"id,omitempty"`
	Name   string `json:"name,omitempty"`
	Email  string `json:"email,omitempty"`
	School string `json:"school"`
}
