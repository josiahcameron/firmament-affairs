from django.db import models
from django.conf import settings

class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    text = models.TextField()
    image = models.ImageField(null=True, upload_to="articles/")
    category = models.CharField(max_length=255)
    new_story = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
