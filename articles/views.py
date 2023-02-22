from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics

from . import models
from .serializers import ArticleSerializer

User = get_user_model()


# Create your views here.
class ArticleCreateAPIView(generics.CreateAPIView):
    queryset = models.Article.objects.all()
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)