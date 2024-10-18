package application

import (
    "go-hexagon/domain/interfaces"
    "go-hexagon/domain/models"
)

type ProductService struct {
    repo interfaces.ProductRepository
}

// instance
func NewProductService(repo interfaces.ProductRepository) *ProductService {
    return &ProductService{repo: repo}
}

// Create product.
func (s *ProductService) Create(product models.Product) error {
    return s.repo.Create(product)
}

// GetAll  products.
func (s *ProductService) GetAll() ([]models.Product, error) {
    return s.repo.GetAll()
}

// GetByID products
func (s *ProductService) GetByID(id int) (models.Product, error) {
    return s.repo.GetByID(id) 
}
// Update product.
func (s *ProductService) Update(id int, product models.Product) error {
    return s.repo.Update(id, product) 
}

// Delete  product.
func (s *ProductService) Delete(id int) error {
    return s.repo.Delete(id) 
}
