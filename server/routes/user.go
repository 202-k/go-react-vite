package routes

import (
	"tryFiber/models"
)

func CreateUserResponse(user models.User) models.UserResponse {
	return models.UserResponse{
		ID:     user.ID,
		Name:   user.Name,
		Email:  user.Email,
		School: user.School,
	}
}

func ConvertSignUpInputToUser(signUp models.SignUpInput) models.User {
	return models.User{
		Email:    signUp.Email,
		Name:     signUp.Name,
		Password: signUp.Password,
		School:   signUp.School,
		Verified: false,
	}
}
