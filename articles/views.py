from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics

from . import models
from .serializers import ArticleSerializer
from .permissions import IfAdminOrReadOnly, IsAuthorOrReadOnly

# Return the User model that is active in this project.
User = get_user_model()


# Create your views here.
class ArticleAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = models.Article.objects.all()
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset


class ArticleDraftView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = IsAuthorOrReadOnly, IfAdminOrReadOnly

    def get_queryset(self):
        return models.Article.objects.filter(author=self.request.user)


class ArticleCreateView(generics.CreateAPIView):
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
