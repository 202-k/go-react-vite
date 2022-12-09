package database

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"tryFiber/models"
)

type DBInstance struct {
	Db *gorm.DB
}

var (
	Database DBInstance
)

func ConnectDb() {
	db, err := gorm.Open(sqlite.Open("api.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("failed to connect database")
	}

	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("Running Migration")

	db.AutoMigrate(&models.User{}, &models.Order{}, &models.Video{})

	Database = DBInstance{Db: db}
}
