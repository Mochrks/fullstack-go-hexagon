package models

import (
    "go.mongodb.org/mongo-driver/bson/primitive"
    "time"
)

type ExecutionLog struct {
    ID        primitive.ObjectID `bson:"_id,omitempty"`
    Endpoint  string             `bson:"endpoint"`
    Duration  time.Duration      `bson:"duration"`
    Timestamp time.Time          `bson:"timestamp"`
}
