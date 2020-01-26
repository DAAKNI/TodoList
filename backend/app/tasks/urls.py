from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash = False)
router.register('', views.TaskViewSet)

urlpatterns = router.urls
