# Generated by Django 2.1.4 on 2018-12-17 03:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('org_structure', '0006_auto_20181215_1526'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='job_title',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='org_structure.JobTitle'),
        ),
    ]
