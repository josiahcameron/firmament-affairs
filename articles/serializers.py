from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models

class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Article
        fields = '__all__'