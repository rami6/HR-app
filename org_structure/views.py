from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class EmployeeSearchView(LoginRequiredMixin, TemplateView):
    template_name = 'employee_search.html'
