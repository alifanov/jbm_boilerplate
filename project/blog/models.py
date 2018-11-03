from django.db import models


class TimeItem(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Tag(models.Model):
    name = models.CharField(max_length=30)

    class Meta:
        ordering = ['name']


class Post(TimeItem):
    title = models.CharField(max_length=255)
    text = models.TextField()
    tags = models.ManyToManyField(Tag, null=True)

    class Meta:
        ordering = ['-updated_at']
