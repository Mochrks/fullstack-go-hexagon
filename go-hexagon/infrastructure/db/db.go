package db

import (
    "go-hexagon/config"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "log"
)

var dbInstance *gorm.DB

// init postgresql
func InitDB(cfg *config.Config) (*gorm.DB, error) {
    var err error
    dsn := "host=" + cfg.DBHost + " user=" + cfg.DBUser + " password=" + cfg.DBPassword + " dbname=" + cfg.DBName + " port=" + cfg.DBPort + " sslmode=disable"
    dbInstance, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

    log.Println("Connected to PostgreSql!")
    if err != nil {
        log.Fatalf("Could not connect to the database: %v", err)
    }
    return dbInstance, nil
}
