from rest_framework import serializers

from core.models import Task

class TaskSerializer(serializers.ModelSerializer):
    """Serializer for the Task objects"""

    class Meta:
        model = Task
        fields = '__all__'
        #read_only_fields = ('id')