from django.urls import path
from .views import EmployeeSearchView

urlpatterns = [
    path('employee-search', EmployeeSearchView.as_view(), name='employee_search'),
]