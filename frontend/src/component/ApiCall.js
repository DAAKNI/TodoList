const baseUrl = "http://localhost:8000/api/tasks/";

//get
export function getTask(){
    return fetch(baseUrl).then(res => res.json());
}