package repository

import (
    "go-hexagon/domain/models"
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
func (r *ProductGorm) Create(product models.Product) error {
   
    product.Date = time.Now().Format("2006-01-02") 
    return r.DB.Create(&product).Error 
}

// GetAll data in postgres
func (r *ProductGorm) GetAll() ([]models.Product, error) {
    var products []models.Product
    err := r.DB.Find(&products).Error
    return products, err
}

// GetByID data in postgres
func (r *ProductGorm) GetByID(id int) (models.Product, error) {
    var product models.Product
    err := r.DB.First(&product, id).Error
    return product, err
}

// Update data in postgress
func (r *ProductGorm) Update(id int, product models.Product) error {
    return r.DB.Model(&models.Product{}).Where("product_id = ?", id).Updates(product).Error
}

// Delete data in postgress
func (r *ProductGorm) Delete(id int) error {
    return r.DB.Delete(&models.Product{}, id).Error
}
