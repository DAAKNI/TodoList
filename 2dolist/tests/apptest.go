package tests

import (
	"fmt"
	"github.com/revel/revel/testing"
)

type AppTest struct {
	testing.TestSuite
}

func (t *AppTest) Before() {
	println("Set up")
}

func (t *AppTest) TestThatIndexPageWorks() {
	t.Get("/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) After() {
	println("Tear down")
}


func (t AppTest) TestTaskIsJson() {
	t.Get("/tasks")
	var s string = `
  "0": {
    "name": "Get milk",
    "done": false,
    "date": "2019-12-01",
    "dueDate": "2019-12-01"
  },
  "1": {
    "name": "Get bread",
    "done": false,
    "date": "2019-12-01",
    "dueDate": "2019-12-01"
  },
  "2": {
    "name": "Get Butter",
    "done": true,
    "date": "2019-12-01",
    "dueDate": "2019-12-01"
  },
  "3": {
    "name": "Get Juice",
    "done": false,
    "date": "2019-12-01",
    "dueDate": "2019-12-01"
  }`
	t.AssertContains(s)
	fmt.Println(t.AssertContains)
}

/*func (t AppTest) TestCreateTask() {

	foo := models.Task{
		Name:    "99",
		Done:    false,
		Date:    "99",
		DueDate: "99",
	}

	jsonValue, err := json.Marshal(foo)

	fmt.Println(err)


	t.Post("/tasks", "application/json", bytes.NewBuffer(jsonValue))
	t.Get("/tasks")
	t.AssertContains("Desk")

}*/
