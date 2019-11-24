package controllers

import (
	"modest-monkey/2dolist/app/models"
	"encoding/json"
	"fmt"
	"github.com/revel/revel"
	"strconv"
)

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}

// tasks as map
var tasks = map[int]models.Task {
0: {
	Name:    "Get milk",
	Done:	false,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
1: {
	Name:    "Get bread",
	Done:	false,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
2: {
	Name:    "Get Butter",
	Done:	true,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
3: {
	Name:    "Get Juice",
	Done:	false,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
}

// tasks as array
/*var tasks = []model.Task{
{
	Name:    "Get milk",
	Done:	false,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
{
	Name:    "Get bread",
	Done:	false,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
{
	Name:    "Get Butter",
	Done:	true,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
{
	Name:    "Get Juice",
	Done:	false,
	Date:    "2019-12-01",
	DueDate: "2019-12-01",
},
} */


// GET Returns JSON with all tasks
func (c App) GetAllTasks()  revel.Result {
	return c.RenderJSON(tasks)
}

// GET Return single task
func (c App) GetTask() revel.Result {
	var id string = c.Params.Get("id")
	i, err := strconv.Atoi(id)
	if err != nil {
		return c.RenderJSON(json.Encoder{})
	}
	return c.RenderJSON(tasks[i])
}

// DELETE deletes task
func (c App) DeleteTask() revel.Result {
	var id string = c.Params.Get("id")
	i, _ := strconv.Atoi(id)
	delete(tasks, i)
	return c.RenderText("")
}

// POST create new task
func (c App) CreateTask() revel.Result {
	var maxKey int = getMaxKey(tasks)
	maxKey++

	data := models.Task{}
	fmt.Println(c.Params.BindJSON(&data))
	tasks[maxKey] = data
	return c.RenderJSON(tasks)

}

// get the key wiht the highest value out of the map
func getMaxKey(m map[int]models.Task) int {
	var maxKey int = 0
	for i := range m {
		if i > maxKey {
			maxKey = i
		}
	}
	return maxKey
}