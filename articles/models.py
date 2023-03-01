from django.db import models
from django.conf import settings


class Article(models.Model):
    MICROCOSM = 'MC'
    QUOTE_OF_THE_DAY = 'QOTD'
    INTER_DIMENSIONAL = 'I_D'
    QUASI_DIMENSIONAL = 'Q_D'
    CATEGORY_CHOICES = [
        (MICROCOSM, 'Microcosm'),
        (QUOTE_OF_THE_DAY, 'Quote of the Day'),
        (INTER_DIMENSIONAL, 'Inter-dimensional'),
        (QUASI_DIMENSIONAL, 'Quasi-dimensional'),
    ]
    title = models.CharField(max_length=255)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    text = models.TextField()
    image = models.ImageField(null=True, blank=True, upload_to="articles/")
    category = models.CharField(
        null=True,
        max_length=255,
        choices=CATEGORY_CHOICES,
        default=MICROCOSM,
    )
    new_story = models.BooleanField(null=True, default=False)
    created_at = models.DateTimeField(null=True, auto_now=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
    is_published = models.BooleanField(null=True, default=False)
    is_submitted = models.BooleanField(null=True, default=False)
    is_archived = models.BooleanField(null=True, default=False)

    def __str__(self):
        return self.title
