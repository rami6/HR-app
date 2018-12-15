from django.db import models
import datetime


class Department(models.Model):
    name = models.CharField(max_length=40, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Employee(models.Model):
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    department = models.ForeignKey(Department, on_delete=models.PROTECT, null=True, blank=True)
    job_title = models.CharField(max_length=20, null=True, blank=True)
    report_to = models.ForeignKey('self', on_delete=models.PROTECT, null=True, blank=True)
    start_date = models.DateField(default=datetime.date.today)
    left_date = models.DateField(default=datetime.date.today, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
