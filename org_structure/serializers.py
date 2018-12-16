from rest_framework import serializers
from .models import Department, JobTitle, Employee


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        exclude = ('created_at', 'updated_at')


class JobTitleSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobTitle
        exclude = ('created_at', 'updated_at')


class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        exclude = ('created_at', 'updated_at')
