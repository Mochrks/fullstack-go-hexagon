package tests

import "go-hexagon/domain"

type ProductService interface {
	GetAll() ([]domain.Product, error)
	Create(product domain.Product) error
	GetByID(id int) (domain.Product, error)
	Update(product domain.Product) error
	Delete(id int) error
}
