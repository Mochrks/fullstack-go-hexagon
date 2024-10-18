package http

import (
    "go-hexagon/application"
    "go-hexagon/domain/models" 
    "go-hexagon/dto" 
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
)

type ProductHandler struct {
    service *application.ProductService
}

func NewProductHandler(service *application.ProductService) *ProductHandler {
    return &ProductHandler{service: service}
}


// GetAllProducts
func (h *ProductHandler) GetAllProducts(c *gin.Context) {
    products, err := h.service.GetAll() 
    if err != nil {
        response := dto.ErrorResponse("Failed to retrieve products", http.StatusInternalServerError)
        c.JSON(http.StatusInternalServerError, response)
        return
    }

    response := dto.SuccessResponse(products, "Products retrieved successfully")
    c.JSON(http.StatusOK, response)
}


// CreateProduct 
func (h *ProductHandler) CreateProduct(c *gin.Context) {
    var product models.Product
    if err := c.ShouldBindJSON(&product); err != nil {
        response := dto.ErrorResponse("Invalid input", http.StatusBadRequest)
        c.JSON(http.StatusBadRequest, response)
        return
    }

    if product.ProductName == "" || product.Stock <= 0 || product.Rating < 0 {
        response := dto.ErrorResponse("Product name, stock, and rating must be provided", http.StatusBadRequest)
        c.JSON(http.StatusBadRequest, response)
        return
    }

    if err := h.service.Create(product); err != nil {
        response := dto.ErrorResponse("Failed to create product", http.StatusInternalServerError)
        c.JSON(http.StatusInternalServerError, response)
        return
    }

    response := dto.SuccessResponse(nil, "Product created successfully")
    c.JSON(http.StatusCreated, response)
}


// GetProduct 
func (h *ProductHandler) GetProduct(c *gin.Context) {
    id := c.Param("id")
    intID, err := strconv.Atoi(id) 
    if err != nil {
        response := dto.ErrorResponse("Invalid product ID", http.StatusBadRequest)
        c.JSON(http.StatusBadRequest, response)
        return
    }

    product, err := h.service.GetByID(intID)
    if err != nil {
        response := dto.ErrorResponse("Product not found", http.StatusNotFound)
        c.JSON(http.StatusNotFound, response)
        return
    }

    response := dto.SuccessResponse(product, "Product retrieved successfully")
    c.JSON(http.StatusOK, response)
}

// UpdateProduct 
func (h *ProductHandler) UpdateProduct(c *gin.Context) {
    id := c.Param("id")
    intID, err := strconv.Atoi(id)
    if err != nil {
        response := dto.ErrorResponse("Invalid product ID", http.StatusBadRequest)
        c.JSON(http.StatusBadRequest, response)
        return
    }

    _, err = h.service.GetByID(intID)
    if err != nil {
        response := dto.ErrorResponse("Product not found", http.StatusNotFound)
        c.JSON(http.StatusNotFound, response)
        return
    }

    var product models.Product
    if err := c.ShouldBindJSON(&product); err != nil {
        response := dto.ErrorResponse("Invalid input", http.StatusBadRequest)
        c.JSON(http.StatusBadRequest, response)
        return
    }

    if err := h.service.Update(intID, product); err != nil {
        response := dto.ErrorResponse("Failed to update product", http.StatusInternalServerError)
        c.JSON(http.StatusInternalServerError, response)
        return
    }

    response := dto.SuccessResponse(nil, "Product updated successfully")
    c.JSON(http.StatusOK, response)
}



// Delete products
func (h *ProductHandler) DeleteProduct(c *gin.Context) {
    id := c.Param("id")
    intID, err := strconv.Atoi(id) 
    if err != nil {
        response := dto.ErrorResponse("Invalid product ID", http.StatusBadRequest)
        c.JSON(http.StatusBadRequest, response)
        return
    }

    _, err = h.service.GetByID(intID)
    if err != nil {
        response := dto.ErrorResponse("Product not found", http.StatusNotFound)
        c.JSON(http.StatusNotFound, response)
        return
    }

    if err := h.service.Delete(intID); err != nil {
        response := dto.ErrorResponse("Failed to delete product", http.StatusInternalServerError)
        c.JSON(http.StatusInternalServerError, response)
        return
    }

    response := dto.SuccessResponse(nil, "Product deleted successfully")
    c.JSON(http.StatusOK, response)
}
