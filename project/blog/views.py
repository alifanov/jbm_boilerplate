from .models import Post
from .serializers import PostSerializer

from rest_framework import viewsets
from rest_framework.filters import SearchFilter
from django_filters import rest_framework as filters


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend, SearchFilter)
    search_fields = ("title",)
    filter_fields = {"created_at": ["gte", "lte"]}
