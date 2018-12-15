from django.shortcuts import render
from django.views.generic import TemplateView


class EmployeeSearchView(TemplateView):
    template_name = 'employee_search.html'
