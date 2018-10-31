import json

from django.test import TestCase
from .models import Post

from django.urls import reverse

from rest_framework.test import APITestCase


# Create your tests here.
class CreationPostTestCase(TestCase):
    TEST_TITLE = 'Title #1'
    TEST_TEXT = 'Text #1'

    def setUp(self):
        Post.objects.create(
            title=self.TEST_TITLE,
            text=self.TEST_TEXT
        )

    def test_save_model(self):
        saved_models = Post.objects.count()
        self.assertEqual(saved_models, 1)


class PostAPIListViewTestCase(APITestCase):
    url = reverse('posts:list')
    TEST_TITLE = 'Title #1'
    TEST_TEXT = 'Text #1'

    def setUp(self):
        Post.objects.create(
            title=self.TEST_TITLE,
            text=self.TEST_TEXT
        )

    def test_get_posts(self):
        response = self.client.get(self.url)
        self.assertTrue(
            len(json.loads(response.content)) == Post.objects.count())
        data = response.data[0]
        self.assertEqual(data['title'], self.TEST_TITLE)
        self.assertEqual(data['text'], self.TEST_TEXT)


class PostAPICreateViewTestCase(APITestCase):
    url = reverse('posts:list')
    TEST_TITLE = 'Title #999'
    TEST_TEXT = 'Text #999'

    def test_create_posts(self):
        response = self.client.post(self.url, {
            'title': self.TEST_TITLE,
            'text': self.TEST_TEXT
        })
        self.assertEqual(201, response.status_code)
        new_post = Post.objects.all()[0]
        self.assertEqual(new_post.title, self.TEST_TITLE)
        self.assertEqual(new_post.text, self.TEST_TEXT)