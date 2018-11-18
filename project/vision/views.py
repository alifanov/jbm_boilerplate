import os
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt

from PIL import Image

from django.core.files.base import ContentFile
from .model import Model


@csrf_exempt
def simple_upload(request):
    if request.method == "POST" and request.FILES["photo"]:
        photo = request.FILES["photo"]
        file_content = ContentFile(photo.read())
        im = Image.open(file_content)

        im = im.rotate(-90, expand=1)
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
        model = Model()
        rim = model.predict(im)
        rim.save(os.path.join("uploads", "my.jpg"), "JPEG")
        return HttpResponse("/static/my.jpg")
    return HttpResponse("Uploaded")
