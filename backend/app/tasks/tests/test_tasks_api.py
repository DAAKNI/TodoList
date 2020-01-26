from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient, APIRequestFactory
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')


def create_user(**params):
    return get_user_model().objects.create_user(**params)

class PublicTasksApiTest(TestCase):
    """Test API without login"""
    def setUp(self):
        self.client = APIClient()


    def test_task_endpoint_not_available_without_login(self):
        """Test that client can't access task api without login"""
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateTasksApiTest(TestCase):
    """Test the tasks API after login"""

    def setUp(self):
        self.user = create_user(
                    email="test@test.de",
                    password="test123",
                    name="test"
                )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_task_endpoint_available_after_login(self):
        """Test if /api/tasks is reachable"""
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_task(self):
        """Test if logged in user can create task"""
        task =  {
            "title": "Test",
            "completed": "False",
            "priority": 1,
            "description": "",
            "created_date": "2020-07-07",
            "due_date": "2020-07-07",
        }
        response = self.client.post('/api/tasks/', task)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)