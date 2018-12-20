from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from custom_rest_framework.permissions import IsSuperUser
from custom_rest_framework.filters import EmployeeFilter

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
    queryset = Department.objects.order_by('name')
    serializer_class = DepartmentSerializer


class JobTitleViewSet(SuperUserEditableModelViewSet):
    queryset = JobTitle.objects.order_by('name')
    serializer_class = JobTitleSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['name']


class EmployeeViewSet(SuperUserEditableModelViewSet):
    queryset = Employee.objects.order_by('first_name', 'last_name')
    serializer_class = EmployeeSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EmployeeFilter
