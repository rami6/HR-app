from django.urls import path
from .views import EmployeeSearchView, DepartmentManageView, JobTitleManageView

urlpatterns = [
    path('employee-search', EmployeeSearchView.as_view(), name='employee_search'),
    path('department-manage', DepartmentManageView.as_view(), name='department_manage'),
    path('job-title-manage', JobTitleManageView.as_view(), name='job_title_manage'),
]