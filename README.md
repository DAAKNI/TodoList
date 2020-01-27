# Modest Monkey
## TodoList
 - Altrichter Taro (ta029) - 33207
 - Knizia Daniel (dk100) - 33644
 - Wiß Pascal (pw046) - 32993

 ## Abstract
 Simple TodoList app using django and the django rest framework in the backend on an alpine python image to provide a REST api. The frontend uses React to access the REST api and deal with login and displaying the todos. The frontend is getting bundled with Webpack and than served with a nginx docker image. The backend test are written with djangos native testframework, the frontend tests are written with enzyme and jest.

## Usage
Bundling with webpack and docker-compose build:
 ```
 ./install.sh
 ```
Running tests:
```
./test.sh 
```
or:
```
./test.sh  (backend | frontend)
```

Run Project
```
docker-compose up
```
Setup django project:

```
docker-compose run backend sh -c "django-admin.py startproject app ."
```

## API Endpoints
## Tasks
### 
Retrieve all tasks
```
GET http://localhost:8000/api/tasks
```
Create a new task:
```
POST http://localhost:8000/api/tasks
```
payload:
```
{
    "title": "",
    "completed": false,
    "priority": null,
    "description": "",
    "created_date": null,
    "due_date": null
}
```
## User
### Create user:
```
POST http://localhost:8000/api/user/create/
```
payload:
```
{
    "email": "",
    "password": "",
    "name": ""
}
```
Get user token:
```
POST http://localhost:8000/api/user/token/
```
payload:
```
{
    "email": "",
    "password": ""
}
```

---

### Access user settings:

```
GET http://localhost:8000/api/user/settings
```
Change user settings:
```
PUT/PATCH http://localhost:8000/api/user/settings
```
payload:
```
{
    "email": "",
    "password": "",
    "name": ""
}
```

