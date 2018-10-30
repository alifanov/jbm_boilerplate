from django.db import models


class TimeItem(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Post(TimeItem):
    title = models.CharField(max_length=255)
    text = models.TextField()

    class Meta:
        ordering = ['-updated_at']
