# Modest Monkey
## TodoList
 - Altrichter Taro (ta029) - 
 - Knizia Daniel (dk100) - 33644
 - Wiß Pascal (pw046) - 

 ## Abrstact
 Simple TodoList app using django in the backend to provide a rest api





Make build
```
docker-compose build
```
Setup django project:

```
docker-compose run backend sh -c "django-admin.py startproject app ."
```
Run tests:
```
docker-compose run --rm backend sh -c "python manage.py test"
```
Create Admin user
```
docker-compose run --rm backend sh -c "python manage.py createsuperuser"
```
Add app to project
```
docker-compose run --rm backend sh -c "python manage.py startapp tasks"
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

