from django.apps import AppConfig


class BlogConfig(AppConfig):
    name = 'blog'

    def ready(self):
        from blog.models import Tag
        print('Initializing model', Tag.__name__)

        # serializers
        from rest_framework import serializers
        class TagSerializer(serializers.ModelSerializer):
            class Meta:
                model = Tag
                fields = '__all__'

        from blog import serializers
        setattr(serializers, 'TagSerializer', TagSerializer)

        # viewsets
        from rest_framework import viewsets

        class TagViewset(viewsets.ModelViewSet):
            serializer_class = TagSerializer
            queryset = Tag.objects.all()

        from blog import views
        setattr(views, 'TagViewSet', TagViewset)
