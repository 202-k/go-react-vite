package models

import "time"

type Post struct {
	Id         uint `json:"id" gorm:"primary_key"`
	CreatedAt  time.Time
	Title      string `json:"title"`
	MainText   string `json:"main_text"`
	VideoRefer int    `json:"video_id"`
	Video      Video  `gorm:"foreignkey:VideoRefer"`
	UserRefer  int    `json:"user_id"`
	User       User   `gorm:"foreignkey:UserRefer"`
}
