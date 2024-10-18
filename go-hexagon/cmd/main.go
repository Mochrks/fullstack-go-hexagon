package main

import (
    "go-hexagon/application"
    "go-hexagon/config"
    "go-hexagon/infrastructure/db"
    "go-hexagon/infrastructure/http"
    "go-hexagon/infrastructure/routes"
    "go-hexagon/infrastructure/repository"
    "go-hexagon/infrastructure/middleware"
    "github.com/gin-gonic/gin"
    "log"
    "github.com/gin-contrib/cors"
    "time"
)

func main() {

    cfg := config.LoadConfig()

    // Initialize PostgreSQL 
    dbInstance, err := db.InitDB(cfg)
    if err != nil {
        log.Fatalf("Failed to initialize PostgreSQL database: %v", err)
    }
    // Initialize MongoDB 
    mongoURI := cfg.MongoURI
    mongoDBName := cfg.MongoDBName

    // Init mongo
    mongoClient, err := middleware.InitializeMongoDB(mongoURI, mongoDBName)
    if err != nil {
        log.Fatalf("Failed to initialize MongoDB: %v", err)
    }

    // Initialize product repository
    productRepo := repository.NewProductGorm(dbInstance)
    // Initialize product service
    productService := application.NewProductService(productRepo)

    // Initialize ExecutionLog repository and service
    executionLogRepo := repository.NewExecutionLogRepository(mongoClient, mongoDBName, "report")
    executionLogService := application.NewExecutionLogService(executionLogRepo)

    // Initialize ExecutionLog handler
    executionLogHandler := http.NewExecutionLogHandler(executionLogService)


    r := gin.Default()
    
    // CORS
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:5173"}, 
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"}, 
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"}, 
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

    // Api for get data mongo
    r.GET("/execution-logs", executionLogHandler.GetAllExecutionLogs)
    

    routes.RegisterProductRoutes(r, productService, mongoClient)

    address := cfg.ServerAddress + ":" + cfg.ServerPort
    if err := r.Run(address); err != nil {
        log.Fatalf("Failed to run server: %v", err)
    }
}
