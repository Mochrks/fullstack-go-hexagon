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

// Create insert to postgres
func (r *ProductGorm) Create(product domain.Product) error {
   
    product.Date = time.Now().Format("2006-01-02") 
    return r.DB.Create(&product).Error 
}

// GetAll data in postgres
func (r *ProductGorm) GetAll() ([]domain.Product, error) {
    var products []domain.Product
    err := r.DB.Find(&products).Error
    return products, err
}

// GetByID data in postgres
func (r *ProductGorm) GetByID(id int) (domain.Product, error) {
    var product domain.Product
    err := r.DB.First(&product, id).Error
    return product, err
}

// Update data in postgress
func (r *ProductGorm) Update(id int, product domain.Product) error {
    return r.DB.Model(&domain.Product{}).Where("product_id = ?", id).Updates(product).Error
}

// Delete data in postgress
func (r *ProductGorm) Delete(id int) error {
    return r.DB.Delete(&domain.Product{}, id).Error
}
