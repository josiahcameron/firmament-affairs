from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics

from . import models
from .serializers import ArticleSerializer

User = get_user_model()


# Create your views here.
class ArticleAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = models.Article.objects.all()
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(article__category=category)
        return queryset