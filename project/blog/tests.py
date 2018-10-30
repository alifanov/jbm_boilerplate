from django.test import TestCase
from .models import Post


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
