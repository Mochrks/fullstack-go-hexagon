package db

import (
    "context"
    "log"
    "time"

    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
    "go-hexagon/infrastructure/models" 
)

var MongoClient *mongo.Client
var MongoDatabase *mongo.Database

// InitializeMongoDB connects to MongoDB and sets up the connection.
func InitializeMongoDB(uri string, dbName string) error {
    clientOptions := options.Client().ApplyURI(uri)
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        return err 
    }

    err = client.Ping(ctx, nil)
    if err != nil {
        return err 
    }

    log.Println("Connected to MongoDB!")

    MongoClient = client
    MongoDatabase = client.Database(dbName)
    
    return nil 
}


func SaveExecutionLog(client *mongo.Client, log models.ExecutionLog) error {
    collection := client.Database("db_products_go").Collection("execution_logs") 
    _, err := collection.InsertOne(context.Background(), log)
    return err
}