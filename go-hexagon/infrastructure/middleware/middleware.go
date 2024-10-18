package middleware

import (
    "log"
    "time"
    "context"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go.mongodb.org/mongo-driver/bson" 
    "github.com/gin-gonic/gin"
)

// Initial mongodb
var mongoCollection *mongo.Collection

func InitializeMongoDB(uri, dbName string) (*mongo.Client, error) {
  
    clientOptions := options.Client().ApplyURI(uri)

    // Connect to MongoDB
    client, err := mongo.Connect(context.TODO(), clientOptions)
    if err != nil {
        return nil, err
    }

    err = client.Ping(context.TODO(), nil)
    if err != nil {
        return nil, err
    }

    mongoCollection = client.Database(dbName).Collection("report")
    log.Println("MongoDB connected and ready")
    return client, nil 
}

func LoggingMiddleware(client *mongo.Client) gin.HandlerFunc {
    return func(c *gin.Context) {
        startTime := time.Now()
        c.Next() 

        // Save MongoDB
        duration := time.Since(startTime)
        logEntry := bson.M{
            "path":     c.Request.URL.Path,
            "method":   c.Request.Method,
            "duration": duration.Seconds() ,
            "timestamp": time.Now(),
        }

        collection := client.Database("db_products_go").Collection("report")
        _, err := collection.InsertOne(context.Background(), logEntry)
        if err != nil {
            log.Printf("Error logging to MongoDB: %v", err)
        }
    }
}

