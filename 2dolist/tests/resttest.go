package tests

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/revel/revel/testing"
	"modest-monkey/2dolist/app/models"
)

type RestTest struct {
	testing.TestSuite
}

func (t *RestTest) Before() {
	println("Set up")
}

func (t RestTest) TestCreateTask() {

	foo := models.Task{
		Name:    "Clean Desk",
		Done:    false,
		Date:    "99",
		DueDate: "99",
	}

	jsonValue, err := json.Marshal(foo)

	fmt.Println(err)


	t.Post("/tasks", "application/json", bytes.NewBuffer(jsonValue))
	t.Get("/tasks")
	t.AssertContains(`{
    "name": "Clean Desk",
    "done": false,
    "date": "99",
    "dueDate": "99"
  }`)


}
func (t *RestTest) After() {
	t.Delete("/tasks/4")
	println("Deleted")
}

