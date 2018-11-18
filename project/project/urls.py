from django.contrib import admin
from django.urls import path, include

from django.shortcuts import render

from django.conf import settings, os

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("api/auth/token/obtain/", TokenObtainPairView.as_view()),
    path("api/auth/token/refresh/", TokenRefreshView.as_view()),
    path("api/", include("blog.urls")),
    path("vision/", include("vision.urls")),
    path("admin/", admin.site.urls),
    path("", lambda req: render(req, "build/index.html")),
]
