# Generated by Django 2.1.4 on 2018-12-17 08:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('org_structure', '0007_auto_20181216_1950'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='report_to',
        ),
    ]