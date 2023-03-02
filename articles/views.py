from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics
from rest_framework.decorators import api_view

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


class HomePageAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        queryset = models.Article.objects.filter(phase='published')
        category = self.request.query_params.get('category')
        if category is not None:
            queryset = queryset.filter(category=category)
        return queryset


class AdminArticleAPIView(generics.ListAPIView):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        phase = self.request.query_params.get('phase')
        queryset = models.Article.objects.filter(
            phase__in=['submitted', 'archived', 'published'])

        if phase is not None:
            queryset = queryset.filter(phase=phase)
        return queryset


class ArticleDraftView(generics.ListCreateAPIView):
    serializer_class = ArticleSerializer
    permission_classes = IsAuthorOrReadOnly, IfAdminOrReadOnly

    def get_queryset(self):
        # Need to add a condition to only render if the article isn't submitted
        if self.request.user.is_superuser:
            return models.Article.objects.all()
        else:
            return models.Article.objects.filter(author=self.request.user)


class ArticleCreateView(generics.CreateAPIView):
    serializer_class = ArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ArticleEditAndDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ArticleSerializer
    queryset = models.Article.objects.all()

    def perform_destroy(self, instance):
        instance.delete()

    def perform_update(self, serializer):
        serializer.save()
