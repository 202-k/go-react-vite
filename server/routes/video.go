package routes

import (
	"github.com/gofiber/fiber/v2"
	"net/http"
	"tryFiber/database"
	"tryFiber/models"
)

func DownloadVideo(c *fiber.Ctx) error {
	var video models.Video

	if err := c.BodyParser(&video); err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error())
	}
	database.Database.Db.Create(&video)

	file, err := c.FormFile("file")
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error)
	}

	err = c.SaveFile(file, file.Filename)
	if err != nil {
		return c.Status(http.StatusBadRequest).JSON(err.Error)
	}

	return c.Status(200).JSON(file)
}
