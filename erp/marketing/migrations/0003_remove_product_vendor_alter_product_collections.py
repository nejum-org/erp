# Generated by Django 4.2.4 on 2025-03-09 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0002_alter_productcategory_options_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='vendor',
        ),
        migrations.AlterField(
            model_name='product',
            name='collections',
            field=models.ManyToManyField(blank=True, related_name='products', to='marketing.productcollection'),
        ),
    ]
