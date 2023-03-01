# Generated by Django 4.1.7 on 2023-03-01 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0007_alter_article_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='is_archived',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='articles/'),
        ),
    ]
