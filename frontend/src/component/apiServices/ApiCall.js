export function deleteData(item) {
  fetch("http://localhost:8000/api/tasks/" + item, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    }
  });
}

export function checkBoxData(item, check) {
  fetch("http://localhost:8000/api/tasks/" + item, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      completed: check
    })
  });
}

export function postData(task) {
  let { token } = localStorage.getItem("token");
  console.log(token);

  // if (token) {
  //   headers["Authorization"] = `Token ${token}`;
  // }
  console.log(localStorage.getItem("token"));
  fetch("http://localhost:8000/api/tasks/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      title: task,
      completed: false,
      priority: null,
      description: "",
      created_date: null,
      due_date: null,
      user: 1
    })
  });
  console.log("posted");
}
