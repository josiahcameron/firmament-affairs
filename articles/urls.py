from django.urls import path

from .views import ArticleAPIView, ArticleCreateView, ArticleDraftView
urlpatterns = [
    path('articles/', ArticleAPIView.as_view()),
    path('add-article/', ArticleCreateView.as_view()),
    path('drafts/', ArticleDraftView.as_view())
]
