package tests

import (
    "bytes"
    "encoding/json"
    "go-hexagon/domain"
    httpHandler "go-hexagon/infrastructure/http"
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

func setupRouter(mockService *MockProductService) *gin.Engine {
    router := gin.Default()
    handler := httpHandler.NewProductHandler(mockService) 

    router.GET("/products", handler.GetAllProducts)
    router.POST("/products", handler.CreateProduct)
    router.GET("/products/:id", handler.GetProduct)
    router.PUT("/products/:id", handler.UpdateProduct)
    router.DELETE("/products/:id", handler.DeleteProduct)

    return router
}


func TestGetAllProducts(t *testing.T) {
    mockService := new(MockProductService)
    router := setupRouter(mockService)

    // Setup mock data
    expectedProducts := []domain.Product{
        {ProductID: 1, ProductName: "Product 1", Stock: 10, Rating: 5.0},
        {ProductID: 2, ProductName: "Product 2", Stock: 20, Rating: 4.5},
    }
    mockService.On("GetAll").Return(expectedProducts, nil)

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/products", nil)
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)

    // Parse response body
    var response map[string]interface{}
    err := json.Unmarshal(w.Body.Bytes(), &response)
    assert.NoError(t, err)

    assert.Equal(t, "Products retrieved successfully", response["message"])

    // Assert number of products returned
    products := response["data"].([]interface{})
    assert.Equal(t, len(expectedProducts), len(products))

    // Assert details of individual products
    assert.Equal(t, expectedProducts[0].ProductName, products[0].(map[string]interface{})["product_name"])
}

func TestCreateProduct(t *testing.T) {
    mockService := new(MockProductService)
    router := setupRouter(mockService)

    product := domain.Product{ProductName: "New Product", Stock: 15, Rating: 4.0}
    mockService.On("Create", product).Return(nil)

    body, _ := json.Marshal(product)
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("POST", "/products", bytes.NewBuffer(body))
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusCreated, w.Code)
    assert.JSONEq(t, `{"message": "Product created successfully"}`, w.Body.String())
}

func TestGetProduct(t *testing.T) {
    mockService := new(MockProductService)
    router := setupRouter(mockService)

    product := domain.Product{ProductID: 1, ProductName: "Product 1", Stock: 10, Rating: 5.0}
    mockService.On("GetByID", 1).Return(product, nil)

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/products/1", nil)
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)

    var response domain.Product
    json.Unmarshal(w.Body.Bytes(), &response)

    assert.Equal(t, "Product 1", response.ProductName)
}

func TestUpdateProduct(t *testing.T) {
    mockService := new(MockProductService)
    router := setupRouter(mockService)

    updatedProduct := domain.Product{ProductID: 1, ProductName: "Updated Product", Stock: 20, Rating: 4.8}
    mockService.On("Update", updatedProduct).Return(nil)

    body, _ := json.Marshal(updatedProduct)
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("PUT", "/products/1", bytes.NewBuffer(body))
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)
    assert.JSONEq(t, `{"message": "Product updated successfully"}`, w.Body.String())
}

func TestDeleteProduct(t *testing.T) {
    mockService := new(MockProductService)
    router := setupRouter(mockService)

    mockService.On("Delete", 1).Return(nil)

    w := httptest.NewRecorder()
    req, _ := http.NewRequest("DELETE", "/products/1", nil)
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)
    assert.JSONEq(t, `{"message": "Product deleted successfully"}`, w.Body.String())
}
