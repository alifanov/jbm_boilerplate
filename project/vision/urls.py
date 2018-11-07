from . import views
from django.urls import path

urlpatterns = [
    path(r'upload/img/', views.simple_upload, name='upload-img')
]