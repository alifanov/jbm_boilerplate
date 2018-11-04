from django.db import models
from django.dispatch import receiver

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


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


@receiver(models.signals.post_save, sender=Post)
def created_handler(sender, instance, created, *args, **kwargs):
    if created:
        layer = get_channel_layer()
        async_to_sync(layer.group_send)('posts_notification', {
            'type': 'receive.json',
            'content': {
                'msg': 'New post created'
            }
        })
