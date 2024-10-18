package interfaces

import (
    "go-hexagon/domain/models"
)

type ProductRepository interface {
    Create(product models.Product) error
    GetAll() ([]models.Product, error)
    GetByID(id int) (models.Product, error)
    Update(id int, product models.Product) error
    Delete(id int) error
}
