# Generated by Django 4.1.7 on 2023-02-25 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0004_article_category_article_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='is_submitted',
            field=models.BooleanField(default=False),
        ),
    ]