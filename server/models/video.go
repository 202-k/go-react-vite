package models

import "time"

type Video struct {
	ID        uint `json:"id" gorm:"primary_key"`
	CreatedAt time.Time
	File      string `json:"file"`
	Url       string `json:"url"`
	UserRefer int    `json:"user_id"`
	User      User   `gorm:"foreignkey:UserRefer"`
}
