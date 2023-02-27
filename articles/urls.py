from django.urls import path

from .views import ArticleAPIView, ArticleCreateView

urlpatterns = [
    path('articles/', ArticleAPIView.as_view()),
    path('add-article/', ArticleCreateView.as_view()),
]
