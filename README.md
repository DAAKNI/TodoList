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

