package controller

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
	"strconv"
	"time"
	"tryFiber/database"
	"tryFiber/models"
	"tryFiber/routes"
)

const SecretKey = "weLoveSki"

func Register(c *fiber.Ctx) error {
	var signUpInput models.SignUpInput

	if err := c.BodyParser(&signUpInput); err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("can't get SignUpUser")
	}

	fmt.Println(signUpInput)

	password, err := bcrypt.GenerateFromPassword([]byte(signUpInput.Password), 14)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).SendString("can't hash password")
	}
	signUpInput.Password = string(password)

	var user models.User
	user = routes.ConvertSignUpInputToUser(signUpInput)
	database.Database.Db.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	fmt.Println("Login call!!")
	var loginUser models.SignInInput

	if err := c.BodyParser(&loginUser); err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.SendString("couldn't get loginUser")
	}

	var user models.User
	database.Database.Db.Where("email = ?", loginUser.Email).First(&user)

	if user.ID == 0 {
		c.Status(fiber.StatusNotFound)
		return c.SendString("user not found")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginUser.Password))
	if err != nil {
		c.Status(fiber.StatusNotAcceptable)
		return c.SendString("incorrect password")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(user.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})

	ss, err := token.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.SendString("could not login")
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    ss,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.SendString("login success")
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

// GetUser gets user information with cookie
func GetUser(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var user models.User

	database.Database.Db.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)
}
