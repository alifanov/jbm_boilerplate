import os
from .models import (Post, Tag)
from .serializers import (PostSerializer, TagSerializer)

from rest_framework import viewsets
from django_filters import rest_framework as filters
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt

from PIL import Image

from vision.model import Model


# Create your views here.
# class TagViewSet(viewsets.ModelViewSet):
#     serializer_class = TagSerializer
#     queryset = Tag.objects.all()


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = {
        'created_at': ['gte', 'lte']
    }


@csrf_exempt
def simple_upload(request):
    if request.method == 'POST' and request.FILES['photo']:
        photo = request.FILES['photo']
        fs = FileSystemStorage()
        filename = fs.save(os.path.join('uploads', photo.name), photo)
        uploaded_file_url = fs.url(filename)
        im = Image.open(uploaded_file_url)
        im = im.rotate(-90, expand=1)
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
        model = Model()
        rim = model.predict(im)
        rim.save(os.path.join('uploads', 'my.jpg'), 'JPEG')
        return HttpResponse('/static/my.jpg')
    return HttpResponse('Uploaded')
