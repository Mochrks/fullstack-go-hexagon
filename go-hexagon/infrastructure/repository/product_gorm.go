package repository

import (
    "go-hexagon/domain"
    "gorm.io/gorm"
    "time"
)

type ProductGorm struct {
    DB *gorm.DB
}


func NewProductGorm(db *gorm.DB) *ProductGorm {
    return &ProductGorm{DB: db}
}

// Create inserts a new product into the database.
func (r *ProductGorm) Create(product domain.Product) error {
    // Set tanggal saat ini
    product.Date = time.Now().Format("2006-01-02") 
    return r.DB.Create(&product).Error 
}

// GetAll retrieves all products from the database.
func (r *ProductGorm) GetAll() ([]domain.Product, error) {
    var products []domain.Product
    err := r.DB.Find(&products).Error
    return products, err
}

// GetByID retrieves a product by its ID.
func (r *ProductGorm) GetByID(id int) (domain.Product, error) {
    var product domain.Product
    err := r.DB.First(&product, id).Error
    return product, err
}

// Update modifies an existing product in the database.
func (r *ProductGorm) Update(id int, product domain.Product) error {
    return r.DB.Model(&domain.Product{}).Where("product_id = ?", id).Updates(product).Error
}

// Delete removes a product from the database.
func (r *ProductGorm) Delete(id int) error {
    return r.DB.Delete(&domain.Product{}, id).Error
}
