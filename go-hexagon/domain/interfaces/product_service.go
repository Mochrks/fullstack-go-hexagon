package interfaces

import (
    "go-hexagon/domain/models"
)

type ProductService interface {
    CreateProduct(product *models.Product) error         
    GetProductByID(id uint) (*models.Product, error)     
    UpdateProduct(product *models.Product) error         
    DeleteProduct(id uint) error                          
    GetAllProducts() ([]models.Product, error)           
}
