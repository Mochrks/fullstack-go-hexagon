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

// Create creates a new product.
func (s *ProductService) Create(product models.Product) error {
    return s.repo.Create(product)
}

// GetAll retrieves all products.
func (s *ProductService) GetAll() ([]models.Product, error) {
    return s.repo.GetAll()
}

// GetByID retrieves a product by its ID.
func (s *ProductService) GetByID(id int) (models.Product, error) {
    return s.repo.GetByID(id) 

// Update modifies an existing product.
func (s *ProductService) Update(id int, product models.Product) error {
    return s.repo.Update(id, product) 
}

// Delete removes a product.
func (s *ProductService) Delete(id int) error {
    return s.repo.Delete(id) 
}
