package models

type Task struct {
	Name string ` json:"name" xml:"name" `
	Done bool ` json:"done"`
	Date string ` json:"date" xml:"date" `
	DueDate string ` json:"dueDate" xml:"dueDate" `
}