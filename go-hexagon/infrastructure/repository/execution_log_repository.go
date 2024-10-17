package repository

import (
    "context"
    "go-hexagon/domain"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "log"
)

type ExecutionLogRepository struct {
    client     *mongo.Client
    database   string
    collection string
}

func NewExecutionLogRepository(client *mongo.Client, database, collection string) *ExecutionLogRepository {
    return &ExecutionLogRepository{
        client:     client,
        database:   database,
        collection: collection,
    }
}

func (r *ExecutionLogRepository) GetAll() ([]domain.ExecutionLog, error) {
    var logs []domain.ExecutionLog
    collection := r.client.Database(r.database).Collection(r.collection)

    cursor, err := collection.Find(context.TODO(), bson.D{})
    if err != nil {
        log.Printf("Error finding execution logs: %v", err)
        return nil, err
    }
    defer cursor.Close(context.TODO())

    for cursor.Next(context.TODO()) {
        var logEntry domain.ExecutionLog
        if err := cursor.Decode(&logEntry); err != nil {
            log.Printf("Error decoding execution log: %v", err)
            return nil, err
        }
        logs = append(logs, logEntry)
    }

    if err := cursor.Err(); err != nil {
        log.Printf("Cursor error: %v", err)
        return nil, err
    }

    log.Printf("Retrieved %d execution logs from MongoDB", len(logs))
    return logs, nil
}
