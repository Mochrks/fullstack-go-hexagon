package tests

import (
	"go-hexagon/domain"
	"github.com/stretchr/testify/mock"
)

type MockProductService struct {
	mock.Mock
}


func (m *MockProductService) GetAll() ([]domain.Product, error) {
	args := m.Called()
	return args.Get(0).([]domain.Product), args.Error(1)
}

func (m *MockProductService) Create(product domain.Product) error {
	args := m.Called(product)
	return args.Error(0)
}

func (m *MockProductService) GetByID(id int) (domain.Product, error) {
	args := m.Called(id)
	return args.Get(0).(domain.Product), args.Error(1)
}

func (m *MockProductService) Update(product domain.Product) error {
	args := m.Called(product)
	return args.Error(0)
}

func (m *MockProductService) Delete(id int) error {
	args := m.Called(id)
	return args.Error(0)
}
