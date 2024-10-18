package interfaces

import (
    "go-hexagon/domain/models"
)
// ProductRepository is the interface that defines methods for product storage.
type ProductRepository interface {
    Create(product models.Product) error
    GetAll() ([]models.Product, error)
    GetByID(id int) (models.Product, error)
    Update(id int, product models.Product) error
    Delete(id int) error
}
