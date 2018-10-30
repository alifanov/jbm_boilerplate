from django.urls import path
from . import views

urlpatterns = [
    path('api/post/', views.PostListView.as_view()),
]
