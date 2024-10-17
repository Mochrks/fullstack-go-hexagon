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
    "github.com/gin-contrib/cors"
    "time"
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

    // Initialize ExecutionLog repository and service
    executionLogRepo := repository.NewExecutionLogRepository(mongoClient, mongoDBName, "report")
    executionLogService := application.NewExecutionLogService(executionLogRepo)

    // Initialize ExecutionLog handler
    executionLogHandler := http.NewExecutionLogHandler(executionLogService)

    // Set up Gin router
    r := gin.Default()

    r.GET("/execution-logs", executionLogHandler.GetAllExecutionLogs)

    // Register product routes with mongoClient
    http.RegisterProductRoutes(r, productService, mongoClient)

    // Setup CORS middleware
    config := cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }

    r.Use(cors.New(config))

    // Start the server
    address := cfg.ServerAddress + ":" + cfg.ServerPort
    if err := r.Run(address); err != nil {
        log.Fatalf("Failed to run server: %v", err)
    }
}
