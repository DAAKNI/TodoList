from rest_framework import viewsets, mixins
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from core.models import Task

from . import serializers

class TaskViewSet(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Task.objects.all()
    serializer_class = serializers.TaskSerializer

    def get_queryset(self):
        """Return objects for the current user only"""
        return self.queryset.filter(user=self.request.user).order_by('id')

    def perform_create(self, serializer):
        """Create new task"""
        serializer.save(user=self.request.user)

