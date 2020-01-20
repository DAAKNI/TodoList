from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
SETTINGS_URL = reverse('user:settings')

def create_user(**params):
    return get_user_model().objects.create_user(**params)

class PublicUserApiTest(TestCase):
    """Test the users API (public)"""

    def setUp(self):
        self.client = APIClient();

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'email': 'test@test.de',
            'password': 'test123',
            'name': 'Test name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)


    def test_user_already_exists(self):
        """Test trying already existing user"""
        payload = {
            'email': 'test@test.de',
            'password': 'test123',
            'name': 'Test name'
        }
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Password at least 5 chas"""
        payload = {
            'email': 'test@test.de',
            'password': 'pw',
            'name': 'Test name'
        }
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exist = get_user_model().objects.filter(
            email=payload['email']
        ).exists()
        self.assertFalse(user_exist)

    def test_create_token_for_user(self):
        """Test that token is created for the user"""
        payload = {
            'email': 'test@test.de',
            'password': 'test123',
            'name': 'Test name'
        }
        # Create user
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)
        # Check if we get a token for the created user
        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """Test that with wring login no token is getting created"""
        payload = {
            'email': 'test@test.de',
            'password': 'test123',
            'name': 'Test name'
        }
        # Create user
        create_user(**payload)
        payload = {
            'email': 'test@test.de',
            'password': 'wrong_password'
        }
        res = self.client.post(TOKEN_URL, payload)
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """No token if user doesnt exist"""
        payload = {
            'email': 'test@test.de',
            'password': 'test123',
        }
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """Test that email and password are requiered"""
        res = self.client.post(TOKEN_URL, {'email': 'bla', 'password': ''})
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """Test that authentication is required to access user settings"""
        res = self.client.get(SETTINGS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateUserApiTest(TestCase):
    """Tests that require authentication"""

    def setUp(self):
        self.user = create_user(
            email="test@test.de",
            password="test123",
            name="test"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test to retrieve the profile/settings after logged in"""
        res = self.client.get(SETTINGS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            "name": self.user.name,
            "email": self.user.email
        })

    def test_setting_values_getting_updated(self):
        """Check weather the profile is getting updated when user changes values"""
        payload = {
            'email': 'new@test.de',
            'password': 'new123',
        }
        res = self.client.patch(SETTINGS_URL, payload)

        self.user.refresh_from_db()

        self.assertEqual(self.user.email, payload['email'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)



