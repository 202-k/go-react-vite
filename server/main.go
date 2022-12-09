package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log"
	"tryFiber/controller"
	"tryFiber/database"
	"tryFiber/routes"
)

func welcome(c *fiber.Ctx) error {
	return c.SendString("Welcome!!")
}

func setupRoutes(app *fiber.App) {
	app.Get("/api", welcome)
	app.Get("/api")

	app.Post("/user/login", controller.Login)
	app.Post("/user/register", controller.Register)
	app.Post("/user/logout", controller.Logout)
	app.Post("/posts/write", routes.WritePost)
	//app.Get("/")
}

func setupStatics(app *fiber.App) {
	app.Static("/", "./views/css")
	app.Static("/", "./views/javascript")
}

func main() {
	database.ConnectDb()

	// Pass the engine to the Views

	app := fiber.New(fiber.Config{})
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:4000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))
	setupStatics(app)
	setupRoutes(app)

	log.Fatal(app.Listen(":3000"))
}
