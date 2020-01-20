
// //get
// export function getTask(){
//     return fetch(baseUrl).then(res => res.json());
// }

// <button onClick={() => deleteData(item.id)}>Delete</button>

export function deleteData(item) {
    fetch('http://localhost:8000/api/tasks/' + item, {
      method: 'delete'
    }).then(response =>
      response.json().then(json => {
        return json;
      })
    );
  }

  //<button onClick={() => checkBoxData(item.id)}>check</button>
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
  //onClick={() => postData(this.props.currentItem.text)}
  export function postData(task) {
    fetch('http://localhost:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
//   export async function getTasks(){
//     try {
//       return await fetch('http://localhost:8000/api/tasks/').then(res => res.json()); 
     
//     } catch (e) {
//       console.log(e);
//     }
//    }
//    export const login = function (cb){
//     fetch('http://localhost:8000/api/tasks/')
//       .then((response) =>{
//         return response.json();
//       })
//       .then((data) =>{
//         cb(data);
//       });
//   }