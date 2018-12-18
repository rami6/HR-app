from django.urls import path
from .views import EmployeeSearchView, DepartmentManageView

urlpatterns = [
    path('employee-search', EmployeeSearchView.as_view(), name='employee_search'),
    path('department-manage', DepartmentManageView.as_view(), name='department_manage'),
]