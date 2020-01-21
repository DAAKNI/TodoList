export function deleteData(item) {
    fetch('http://localhost:8000/api/tasks/' + item, {
      method: 'delete'
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  }

  export function checkBoxData(item, check) {
    fetch('http://localhost:8000/api/tasks/' + item, {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          completed: check,
         
      })
      })
  }
  
  export function postData(task) {
    let {token} = localStorage.getItem('token');

    // if (token) {
    //   headers["Authorization"] = `Token ${token}`;
    // }
    console.log(localStorage.getItem('token'))
    fetch('http://localhost:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
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
      
      })
  }