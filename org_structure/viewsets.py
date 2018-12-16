from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from custom_rest_framework.permissions import IsSuperUser

from .models import Department, JobTitle, Employee
from .serializers import DepartmentSerializer, JobTitleSerializer, EmployeeSerializer


class SuperUserEditableModelViewSet(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsSuperUser]
        return [permission() for permission in permission_classes]


class DepartmentViewSet(SuperUserEditableModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class JobTitleViewSet(SuperUserEditableModelViewSet):
    queryset = JobTitle.objects.all()
    serializer_class = JobTitleSerializer


class EmployeeViewSet(SuperUserEditableModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
