# Generated by Django 4.1.7 on 2023-03-02 19:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0009_article_phase'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='is_archived',
        ),
        migrations.RemoveField(
            model_name='article',
            name='is_published',
        ),
        migrations.RemoveField(
            model_name='article',
            name='is_submitted',
        ),
    ]