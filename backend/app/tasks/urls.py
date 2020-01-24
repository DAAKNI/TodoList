from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash = False)
router.register('', views.TaskViewSet)
#router.register('<int:task>', views.TaskDetailView)

app_name = 'tasks'

urlpatterns = router.urls
urlpatterns = [
    path('', include(router.urls))
]


# urlpatterns = [
#     path('', views.TaskViewSet),
#     path('api/tasks/<int:pk>/', views.TaskDetailView),
# ]