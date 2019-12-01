from rest_framework import viewsets, mixins
from rest_framework import generics

from core.models import Task

from . import serializers

class TaskViewSet(viewsets.ModelViewSet):
    """Manage tasks in the database"""
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer

#    def get_queryset(self):
#        """Return objects for the current user only"""
#        return self.queryset.filter(user=self.request.user).order_by('-name')

