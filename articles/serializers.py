from django.contrib.auth import get_user_model

from rest_framework import serializers

from . import models


class ArticleSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = models.Article
        fields = ('id', 'title', 'author', 'text', 'image', 'category',
                  'new_story', 'created_at', 'updated_at', 'is_published', 'is_submitted', 'author_username')
