from rest_framework import generics
from .models import Post
from .serializers import PostSerializer


# Create your views here.
class PostListView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
