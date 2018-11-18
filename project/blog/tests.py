import json

from django.test import TestCase
from .models import Post, Tag
from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APITestCase


# Create your tests here.
class CreationPostTestCase(TestCase):
    TEST_TITLE = "Title #1"
    TEST_TEXT = "Text #1"

    def setUp(self):
        Post.objects.create(title=self.TEST_TITLE, text=self.TEST_TEXT)

    def test_save_model(self):
        saved_models = Post.objects.count()
        self.assertEqual(saved_models, 1)


class PostAPIListViewTestCase(APITestCase):
    url = reverse("post-list")
    TEST_TITLE = "Title #1"
    TEST_TEXT = "Text #1"

    def setUp(self):
        user = User.objects.create(username="test_user")
        self.client.force_authenticate(user=user)
        Post.objects.create(title=self.TEST_TITLE, text=self.TEST_TEXT)

    def test_get_posts(self):
        response = self.client.get(self.url)
        self.assertTrue(len(json.loads(response.content)) == Post.objects.count())
        data = response.data[0]
        self.assertEqual(data["title"], self.TEST_TITLE)
        self.assertEqual(data["text"], self.TEST_TEXT)


class PostAPICreateViewTestCase(APITestCase):
    url = reverse("post-list")
    TEST_TITLE = "Title #999"
    TEST_TEXT = "Text #999"

    def setUp(self):
        user = User.objects.create(username="test_user")
        self.client.force_authenticate(user=user)

    def test_create_posts(self):
        response = self.client.post(
            self.url, {"title": self.TEST_TITLE, "text": self.TEST_TEXT}
        )
        self.assertEqual(201, response.status_code)
        new_post = Post.objects.all()[0]
        self.assertEqual(new_post.title, self.TEST_TITLE)
        self.assertEqual(new_post.text, self.TEST_TEXT)


class PostAPIUpdateViewTestCase(APITestCase):
    url = reverse("post-list")
    TEST_TITLE = "Title #999"
    TEST_TEXT = "Text #999"
    TEST_TAG_NAME = "Name #999"

    def setUp(self):
        user = User.objects.create(username="test_user")
        self.client.force_authenticate(user=user)
        self.tag = Tag.objects.create(name=self.TEST_TAG_NAME)

    def test_create_and_update_post_with_tags(self):
        response = self.client.post(
            self.url,
            {"title": self.TEST_TITLE, "text": self.TEST_TEXT, "tags": [self.tag.pk]},
        )
        self.assertEqual(201, response.status_code)
        new_post = Post.objects.all()[0]
        self.assertEqual(new_post.title, self.TEST_TITLE)
        self.assertEqual(new_post.text, self.TEST_TEXT)
        self.assertEqual(new_post.tags.all()[0].pk, self.tag.pk)

        url = reverse("post-detail", kwargs={"pk": new_post.pk})
        response = self.client.put(
            url, {"title": new_post.title, "text": new_post.text, "tags": []}
        )
        self.assertEqual(200, response.status_code)
        updated_post = Post.objects.first()
        self.assertEqual(new_post.title, self.TEST_TITLE)
        self.assertEqual(new_post.text, self.TEST_TEXT)
        self.assertEqual(new_post.tags.count(), 0)


class TagAPIListView(APITestCase):
    url = reverse("tag-list")
    TEST_NAME = "Tag #1"

    def setUp(self):
        user = User.objects.create(username="test_user")
        self.client.force_authenticate(user=user)
        Tag.objects.create(name=self.TEST_NAME)

    def test_get_tags(self):
        response = self.client.get(self.url)
        self.assertTrue(len(json.loads(response.content)) == Tag.objects.count())
        data = response.data[0]
        self.assertEqual(data["name"], self.TEST_NAME)


class TagAPICreateViewTestCase(APITestCase):
    url = reverse("tag-list")
    TEST_NAME = "Name #999"

    def setUp(self):
        user = User.objects.create(username="test_user")
        self.client.force_authenticate(user=user)

    def test_create_posts(self):
        response = self.client.post(self.url, {"name": self.TEST_NAME})
        self.assertEqual(201, response.status_code)
        new_tag = Tag.objects.all()[0]
        self.assertEqual(new_tag.name, self.TEST_NAME)

