package domain

import "time"

type Product struct {
    ProductID   int     `json:"product_id" gorm:"primaryKey;autoIncrement"` 
    ProductName string  `json:"name" gorm:"not null"`                      
    Description string  `json:"description"`
    Rating      float64 `json:"rating" gorm:"not null"`                    
    Stock       int     `json:"stock" gorm:"not null"`                       
    Price       float64 `json:"price" gorm:"not null"`                       
    Date        string  `json:"date"`
    CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`           
    UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`          
}
