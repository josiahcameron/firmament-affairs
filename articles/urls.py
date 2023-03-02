from django.urls import path

from .views import ArticleAPIView, ArticleCreateView, ArticleDraftView, ArticleEditAndDestroy, HomePageAPIView
urlpatterns = [
    path('articles/', ArticleAPIView.as_view()),
    path('add-article/', ArticleCreateView.as_view()),
    path('drafts/', ArticleDraftView.as_view()),
    path('destroy/<int:pk>/', ArticleEditAndDestroy.as_view()),
    path('update/<int:pk>/', ArticleEditAndDestroy.as_view()),
    path('home/', HomePageAPIView.as_view())
]
