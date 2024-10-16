package domain

// ProductService defines the business logic for products
type ProductService interface {
    CreateProduct(product *Product) error
    GetProductByID(id uint) (*Product, error)
    UpdateProduct(product *Product) error
    DeleteProduct(id uint) error
    GetAllProducts() ([]Product, error)
}
