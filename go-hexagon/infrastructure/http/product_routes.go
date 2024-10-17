package http

import (
    "go-hexagon/infrastructure/middleware"
    "go-hexagon/application"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/mongo" 
)

// RegisterProductRoutes
func RegisterProductRoutes(r *gin.Engine, service *application.ProductService, mongoClient *mongo.Client) {
    handler := NewProductHandler(service)

    // Apply LoggingMiddleware with mongoClient
    r.Use(middleware.LoggingMiddleware(mongoClient))

    r.GET("/products", handler.GetAllProducts)
    r.GET("/products/:id", handler.GetProduct)
    r.PUT("/products/:id", handler.UpdateProduct)
    r.DELETE("/products/:id", handler.DeleteProduct)
    r.POST("/products", handler.CreateProduct)
}
