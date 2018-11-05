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


def send_msg_to_ws(text):
    layer = get_channel_layer()
    async_to_sync(layer.group_send)('posts_notification', {
        'type': 'receive.json',
        'content': {
            'msg': text
        }
    })


@receiver(models.signals.post_save, sender=Post)
def created_handler(sender, instance, created, *args, **kwargs):
    if created:
        send_msg_to_ws('New post created')


@receiver(models.signals.post_delete, sender=Post)
def created_handler(sender, instance, *args, **kwargs):
    send_msg_to_ws('Post deleted')


@receiver(models.signals.post_save, sender=Tag)
def created_handler(sender, instance, created, *args, **kwargs):
    if created:
        send_msg_to_ws('New tag created')


@receiver(models.signals.post_delete, sender=Tag)
def created_handler(sender, instance, *args, **kwargs):
    send_msg_to_ws('Tag deleted')
