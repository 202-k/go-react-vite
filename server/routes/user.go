package routes

import (
	"github.com/gofiber/fiber/v2"
	"tryFiber/database"
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

//func FindUserExistence(c *fiber.Ctx) error {
//	var user models.User
//	c.BodyParser(&user)
//	database.Database.Db.Find(&user, "email = ?", email)
//
//	if user.ID == 0 {
//		return true
//	} else {
//		return false
//	}
//}

func GetEmailList(c *fiber.Ctx) error {
	var users []models.User
	database.Database.Db.Select("email").Find(&users)

	return c.JSON(users)
}
