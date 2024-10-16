package domain

// ProductRepository is the interface that defines methods for product storage.
type ProductRepository interface {
    Create(product Product) error
    GetAll() ([]Product, error)
    GetByID(id int) (Product, error)
    Update(id int, product Product) error
    Delete(id int) error
}
