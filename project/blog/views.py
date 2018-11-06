import os
from .models import (Post)
from .serializers import (PostSerializer, TagSerializer)

from rest_framework import viewsets
from django_filters import rest_framework as filters
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt

from PIL import Image

from io import BytesIO
from django.core.files.base import ContentFile

from vision.model import Model


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
        file_content = ContentFile(photo.read())
        im = Image.open(file_content)

        im = im.rotate(-90, expand=1)
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
        model = Model()
        rim = model.predict(im)
        # response = HttpResponse(content_type="image/jpeg")
        # rim.save(response, "JPEG")
        # return response
        rim.save(os.path.join('uploads', 'my.jpg'), 'JPEG')
        return HttpResponse('/static/my.jpg')
    return HttpResponse('Uploaded')
