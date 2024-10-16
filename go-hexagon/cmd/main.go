package main

import (
    "go-hexagon/application"
    "go-hexagon/config"
    "go-hexagon/infrastructure/db"
    "go-hexagon/infrastructure/http"
    "go-hexagon/infrastructure/repository"
    "go-hexagon/infrastructure/middleware"
    "github.com/gin-gonic/gin"
    "log"
)

func main() {
    // Load configuration
    cfg := config.LoadConfig()

    // Initialize PostgreSQL database
    dbInstance, err := db.InitDB(cfg) 
    if err != nil {
        log.Fatalf("Failed to initialize PostgreSQL database: %v", err)
    }

    // Initialize MongoDB for logging middleware
    mongoURI := cfg.MongoURI
    mongoDBName := cfg.MongoDBName

    // Memanggil fungsi InitializeMongoDB dari package db
    mongoClient, err := middleware.InitializeMongoDB(mongoURI, mongoDBName)
    if err != nil { 
        log.Fatalf("Failed to initialize MongoDB: %v", err)
    }

    // Initialize product repository with the PostgreSQL database instance
    productRepo := repository.NewProductGorm(dbInstance)

    // Initialize product service
    productService := application.NewProductService(productRepo)

    // Set up Gin router
    r := gin.Default()

    // Register product routes with mongoClient
    http.RegisterProductRoutes(r, productService, mongoClient)

    // Start the server
    address := cfg.ServerAddress + ":" + cfg.ServerPort
    if err := r.Run(address); err != nil {
        log.Fatalf("Failed to run server: %v", err)
    }
}
