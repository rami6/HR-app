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
    department_name = serializers.SerializerMethodField()
    job_title_name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'department', 'job_title', 'join_date', 'left_date', 'department_name', 'job_title_name']

    def get_department_name(self, obj):
        return obj.department.name

    def get_job_title_name(self, obj):
        return obj.job_title.name
