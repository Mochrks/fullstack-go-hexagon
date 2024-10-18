package routes

import (
    "go-hexagon/infrastructure/middleware"
    "go-hexagon/infrastructure/http"
    "go-hexagon/application"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/mongo" 
)

// routes api
func RegisterProductRoutes(r *gin.Engine, service *application.ProductService, mongoClient *mongo.Client) {
    handler := http.NewProductHandler(service)

    // Apply LoggingMiddleware 
    r.Use(middleware.LoggingMiddleware(mongoClient))

    r.GET("/products", handler.GetAllProducts)
    r.GET("/products/:id", handler.GetProduct)
    r.PUT("/products/:id", handler.UpdateProduct)
    r.DELETE("/products/:id", handler.DeleteProduct)
    r.POST("/products", handler.CreateProduct)
}
