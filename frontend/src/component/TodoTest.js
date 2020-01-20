// import React, { Component } from "react";
// import {deleteData, checkBoxData} from './ApiCall'


// class TodoItems extends Component {
  
//   state = {
//     todos: []
//   };
//     async componentDidMount() {
//        // {
//       //   fetch('http://localhost:8000/api/tasks/')
//       //   .then(res => res.json())
//       //   .then((data) => {
//       //     this.setState({ todos: data })
//       //   })
//       //   .catch(console.log)
//       // }
//     try {
//       const res = await fetch('http://localhost:8000/api/tasks/'); // fetching the data from api, before the page loaded
//       const todos = await res.json();
//       this.setState({
//         todos
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }
 
//    getTasks(item){
//     try {
//       const res = await fetch('http://localhost:8000/api/tasks/'); 
//       const todos = await res.json();
//       this.setState({
//         todos
//       });
//     } catch (e) {
//       console.log(e);
//     }
//    }
 


//   createTasks = item => {
//     return (
//       <li key={item.key}>
//         <input
//           type="checkbox"
//           checked={item.completed}
//           onChange={() => this.props.toggleCompleted(item.key)}
//         />
//         {item.text}
//         <button onClick={() => deleteData(item.key)}>Delete</button>
//       </li>
//     );
//   };

//   todoList() {
    
//     return (
//       <div>
//         {this.state.todos.map(item => (
//           <div key={item.id} >
//             <li>{item.title}</li>
//             <span>{item.id}</span>
//             <button onClick={() => deleteData(item.id)}>Delete</button>
//             <button onClick={() => checkBoxData(item.id)}>check</button>
//           </div>
//         ))}
//       </div>
//     );
// }

//   render() {
//     // const todoEntries = this.props.entries;
//     // const listItems = todoEntries.map(this.createTasks);
    
//     // return <ul className="theList">{listItems}</ul>;
//     return (
//       <div>
       
//           <h3>Todos List</h3>
//           { this.todoList() }
//       </div>
//   )
//   }
// }

// export default TodoItems;


