from .models import (Post, Tag)
from .serializers import (PostSerializer, TagSerializer)

from rest_framework import viewsets
from django_filters import rest_framework as filters


# Create your views here.
class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    queryset = Tag.objects.all()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = {
        'created_at': ['gte', 'lte']
    }
