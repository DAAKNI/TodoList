from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash = False)
router.register('', views.TaskViewSet)

#app_name = 'tasks'

urlpatterns = router.urls
#    [
#    path('', include(router.urls))
#]