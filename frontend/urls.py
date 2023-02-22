from django.urls import path, include
from . import views
#Corresponds with namespace


urlpatterns = [
    path('', views.IndexView.as_view(), name = 'index')
]