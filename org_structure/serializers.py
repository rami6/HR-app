from rest_framework import serializers
from .models import Department, JobTitle, Employee
from rest_framework.validators import UniqueValidator


class DepartmentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[UniqueValidator(queryset=Department.objects.all())])

    class Meta:
        model = Department
        exclude = ('created_at', 'updated_at')


class JobTitleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[UniqueValidator(queryset=JobTitle.objects.all())])

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
