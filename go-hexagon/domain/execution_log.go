package domain

import (
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/bson/primitive"
    "time"
)

type ExecutionLog struct {
    ID        primitive.ObjectID `bson:"_id,omitempty"`
    Path      string             `bson:"path"`      
    Method    string             `bson:"method"`    
    Duration  float64            `bson:"duration"`  
    Timestamp time.Time          `bson:"timestamp"`
}

// UnmarshalBSON for decoding
func (e *ExecutionLog) UnmarshalBSON(data []byte) error {
    var aux struct {
        ID        primitive.ObjectID `bson:"_id,omitempty"`
        Path      string             `bson:"path"`      
        Method    string             `bson:"method"`    
        Duration  float64            `bson:"duration"` 
        Timestamp time.Time          `bson:"timestamp"`
    }

    if err := bson.Unmarshal(data, &aux); err != nil {
        return err
    }

    e.ID = aux.ID
    e.Path = aux.Path             
    e.Method = aux.Method        
    e.Duration = aux.Duration     
    e.Timestamp = aux.Timestamp

    return nil
}

// MarshalBSON for encoding
func (e ExecutionLog) MarshalBSON() ([]byte, error) {
    return bson.Marshal(struct {
        ID        primitive.ObjectID `bson:"_id,omitempty"`
        Path      string             `bson:"path"`      
        Method    string             `bson:"method"`    
        Duration  float64            `bson:"duration"`  
        Timestamp time.Time          `bson:"timestamp"`
    }{
        ID:        e.ID,
        Path:      e.Path,         
        Method:    e.Method,        
        Duration:  e.Duration,      
        Timestamp: e.Timestamp,
    })
}
