from django.urls import path

from . import views


urlpatterns = [
    path('articles/', views.ArticleAPIView.as_view()),
    path('add-article/', views.ArticleCreateView.as_view()),
    path('drafts/', views.ArticleDraftView.as_view()),
    path('destroy/<int:pk>/', views.ArticleEditAndDestroy.as_view()),
    path('update/<int:pk>/', views.ArticleEditAndDestroy.as_view()),
    path('home/', views.HomePageAPIView.as_view()),
    path('admin/', views.AdminArticleAPIView.as_view()),
]
