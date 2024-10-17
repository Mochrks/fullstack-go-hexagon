package application

import (
    "go-hexagon/domain"
    "go-hexagon/infrastructure/repository"
)

type ExecutionLogService struct {
    repository *repository.ExecutionLogRepository
}

func NewExecutionLogService(repo *repository.ExecutionLogRepository) *ExecutionLogService {
    return &ExecutionLogService{
        repository: repo,
    }
}

// get all data in mongodb
func (s *ExecutionLogService) GetAll() ([]domain.ExecutionLog, error) {
    return s.repository.GetAll()
}
