package routes

import (
	"github.com/gofiber/fiber/v2"
	"tryFiber/controller"
	"tryFiber/database"
	"tryFiber/models"
)

type Post struct {
	Id       uint        `json:"id"`
	Title    string      `json:"title"`
	MainText string      `json:"main_text"`
	VideoId  int         `json:"video_id"`
	User     models.User `json:"user"`
}

func CreateResponsePost(post models.Post, user models.User) Post {
	return Post{
		Id: post.Id, Title: post.Title, MainText: post.MainText, VideoId: post.VideoRefer, User: user,
	}
}

func GetPosts(c *fiber.Ctx) error {
	var posts []models.Post
	database.Database.Db.Find(&posts)

	var responsePosts []Post
	for _, post := range posts {
		var user models.User
		database.Database.Db.Find(&user, "id = ?", post.UserRefer)
		responsePost := CreateResponsePost(post, user)
		responsePosts = append(responsePosts, responsePost)
	}

	return c.Status(200).JSON(responsePosts)
}

func WritePost(c *fiber.Ctx) error {
	var post models.Post

	if err := c.BodyParser(&post); err != nil {
		return c.Status(400).JSON(err.Error())
	}

	var user models.User
	//if err := FindUser(post.UserRefer, &user); err != nil {
	//	return c.Status(400).JSON(err.Error())
	//}

	user = controller.GetUser(c)
	post.User = user
	database.Database.Db.Create(&post)

	responsePost := CreateResponsePost(post, user)

	return c.Status(200).JSON(responsePost)
}
