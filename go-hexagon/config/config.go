package config

import (
    "github.com/joho/godotenv"
    "log"
    "os"
)

type Config struct {
    DBHost       string
    DBPort       string
    DBUser       string 
    DBPassword   string
    DBName       string
    ServerAddress string
    ServerPort   string 
    MongoURI     string
    MongoDBName  string
}

func LoadConfig() *Config {
    // Load .env file
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file")
    }

    return &Config{
        DBHost:       os.Getenv("DB_HOST"),
        DBPort:       os.Getenv("DB_PORT"),
        DBUser:       os.Getenv("DB_USER"),
        DBPassword:   os.Getenv("DB_PASSWORD"),
        DBName:       os.Getenv("DB_NAME"),
        ServerAddress: os.Getenv("SERVER_ADDRESS"),
        ServerPort:   os.Getenv("SERVER_PORT"),
        MongoURI:     os.Getenv("MONGO_URI"),         
        MongoDBName:  os.Getenv("MONGO_DB_NAME"),   
    }
}
