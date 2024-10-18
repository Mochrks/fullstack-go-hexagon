package http

import (
    "go-hexagon/application"
    "go-hexagon/dto"
    "net/http"
    "log" 
    "github.com/gin-gonic/gin"
)

type ExecutionLogHandler struct {
    service *application.ExecutionLogService
}

func NewExecutionLogHandler(service *application.ExecutionLogService) *ExecutionLogHandler {
    return &ExecutionLogHandler{service: service}
}

// GetAllExecutionLogs 
func (h *ExecutionLogHandler) GetAllExecutionLogs(c *gin.Context) {
    logs, err := h.service.GetAll()
    if err != nil {
       
        log.Printf("Error retrieving execution logs: %v", err)

        response := dto.ErrorResponse("Failed to retrieve execution logs", http.StatusInternalServerError)
        c.JSON(http.StatusInternalServerError, response)
        return
    }

    response := dto.SuccessResponse(logs, "Execution logs retrieved successfully")
    c.JSON(http.StatusOK, response)
}

