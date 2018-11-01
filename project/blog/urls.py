from django.urls import path
from . import views

app_name = 'posts'

urlpatterns = [
    path('api/post/', views.PostListView.as_view(), name='list'),
]
