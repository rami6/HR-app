from django_filters import rest_framework as filters
from django.db.models import Q
from org_structure.models import Employee


class NumberInFilter(filters.BaseInFilter, filters.NumberFilter):
    pass


class EmployeeFilter(filters.FilterSet):
    name = filters.CharFilter(method='filter_full_name')
    department = NumberInFilter(field_name="department__id", lookup_expr='in')
    working = filters.BooleanFilter(field_name='left_date', lookup_expr='isnull')

    class Meta:
        model = Employee
        fields = ['name', 'department']

    def filter_full_name(self, queryset, name, value):
        return queryset.filter(Q(first_name__icontains=value)|Q(last_name__icontains=value))
