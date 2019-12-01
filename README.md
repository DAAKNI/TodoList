# modest monkey project



Make build
```
docker-compose build"
```
Setup django project:

```
docker-compose run app sh -c "django-admin.py startproject app ."
```
Run tests:
```
docker-compose run app sh -c "python manage.py test"
```
Create Admin user
```
docker-compose run app sh -c "python manage.py createsuperuser"
```
Add app to project
```
docker-compose run --rm app sh -c "python manage.py startapp tasks"
```