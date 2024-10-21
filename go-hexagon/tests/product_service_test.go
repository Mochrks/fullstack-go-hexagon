package tests

import (
    "testing"
    "go-hexagon/domain/models"
    "go-hexagon/application"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/mock"
)

type MockProductRepository struct {
    mock.Mock
}

func (m *MockProductRepository) Create(product models.Product) error {
    args := m.Called(product)
    return args.Error(0)
}

func (m *MockProductRepository) GetAll() ([]models.Product, error) {
    args := m.Called()
    return args.Get(0).([]models.Product), args.Error(1)
}

func (m *MockProductRepository) GetByID(id int) (models.Product, error) {
    args := m.Called(id)
    return args.Get(0).(models.Product), args.Error(1)
}

func (m *MockProductRepository) Update(id int, product models.Product) error {
    args := m.Called(id, product)
    return args.Error(0)
}

func (m *MockProductRepository) Delete(id int) error {
    args := m.Called(id)
    return args.Error(0)
}

func TestProductService_Create(t *testing.T) {
    mockRepo := new(MockProductRepository)
    service := application.NewProductService(mockRepo)

    product := models.Product{
        ProductName: "Test Product",
        Description: "Test Description",
        Stock:       10,
        Price:       100.0,
    }

    mockRepo.On("Create", product).Return(nil)

    err := service.Create(product)

    assert.NoError(t, err)
    mockRepo.AssertExpectations(t)
}

func TestProductService_GetAll(t *testing.T) {
    mockRepo := new(MockProductRepository)
    service := application.NewProductService(mockRepo)

    expectedProducts := []models.Product{
        {ProductID: 1, ProductName: "Product 1"},
        {ProductID: 2, ProductName: "Product 2"},
    }

    mockRepo.On("GetAll").Return(expectedProducts, nil)

    products, err := service.GetAll()

    assert.NoError(t, err)
    assert.Equal(t, expectedProducts, products)
    mockRepo.AssertExpectations(t)
}

func TestProductService_GetByID(t *testing.T) {
    mockRepo := new(MockProductRepository)
    service := application.NewProductService(mockRepo)

    expectedProduct := models.Product{ProductID: 1, ProductName: "Test Product"}

    mockRepo.On("GetByID", 1).Return(expectedProduct, nil)

    product, err := service.GetByID(1)

    assert.NoError(t, err)
    assert.Equal(t, expectedProduct, product)
    mockRepo.AssertExpectations(t)
}

func TestProductService_Update(t *testing.T) {
    mockRepo := new(MockProductRepository)
    service := application.NewProductService(mockRepo)

    product := models.Product{
        ProductID:   1,
        ProductName: "Updated Product",
    }

    mockRepo.On("Update", 1, product).Return(nil)

    err := service.Update(1, product)

    assert.NoError(t, err)
    mockRepo.AssertExpectations(t)
}

func TestProductService_Delete(t *testing.T) {
    mockRepo := new(MockProductRepository)
    service := application.NewProductService(mockRepo)

    mockRepo.On("Delete", 1).Return(nil)

    err := service.Delete(1) 

    assert.NoError(t, err)
    mockRepo.AssertExpectations(t)
}