package models

import "time"

type Order struct {
	ID        uint `json:"id" gorm:"primary_key"`
	CreatedAt time.Time
	UserRefer int  `json:"user_id"`
	User      User `gorm:"foreignkey:UserRefer"`
}
