package application

import (
    "go-hexagon/domain"
)

type ProductService struct {
    repo domain.ProductRepository
}

// NewProductService creates a new instance of ProductService.
func NewProductService(repo domain.ProductRepository) *ProductService {
    return &ProductService{repo: repo}
}

// Create creates a new product.
func (s *ProductService) Create(product domain.Product) error {
    return s.repo.Create(product)
}

// GetAll retrieves all products.
func (s *ProductService) GetAll() ([]domain.Product, error) {
    return s.repo.GetAll()
}

// GetByID retrieves a product by its ID.
func (s *ProductService) GetByID(id int) (domain.Product, error) {
    return s.repo.GetByID(id) // Mengubah id menjadi int
}

// Update modifies an existing product.
func (s *ProductService) Update(id int, product domain.Product) error {
    return s.repo.Update(id, product) // Mengubah menjadi (id, product)
}

// Delete removes a product.
func (s *ProductService) Delete(id int) error {
    return s.repo.Delete(id) // Mengubah id menjadi int
}
