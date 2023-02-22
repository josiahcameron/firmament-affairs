from django.urls import path

from .views import ArticleCreateAPIView

urlpatterns = [
    path('articles/', ArticleCreateAPIView.as_view()),
]