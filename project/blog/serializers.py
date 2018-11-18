from rest_framework import serializers
from .models import Post, Tag


class PostSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        many=True, read_only=False, queryset=Tag.objects.all()
    )

    class Meta:
        model = Post
        fields = "__all__"
