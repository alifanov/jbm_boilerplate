from django.urls import path
from . import views

from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=True)
router.register('tags', views.TagViewSet)
router.register('posts', views.PostViewSet)

urlpatterns = router.urls + [
    path(r'upload/img/', views.simple_upload, name='upload-img')
]