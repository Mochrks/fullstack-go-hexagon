package dto

type ResponseDTO struct {
    Data       interface{} `json:"data"`
    Status     string      `json:"status"`
    StatusCode int         `json:"statusCode"`
    Message    string      `json:"message"`
}

// SuccessResponse generates a success response.
func SuccessResponse(data interface{}, message string) ResponseDTO {
    return ResponseDTO{
        Data:       data,
        Status:     "success",
        StatusCode: 200,
        Message:    message,
    }
}

// ErrorResponse generates an error response.
func ErrorResponse(message string, statusCode int) ResponseDTO {
    return ResponseDTO{
        Data:       nil,
        Status:     "error",
        StatusCode: statusCode,
        Message:    message,
    }
}
