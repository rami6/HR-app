from django.http import HttpResponse
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin


class EmployeeSearchView(LoginRequiredMixin, TemplateView):
    template_name = 'employee_search.html'


class DepartmentManageView(LoginRequiredMixin, TemplateView):
    template_name = 'department_manage.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        elif not request.user.is_superuser:
            return HttpResponse('Only superuser can access this page.')
        return super().dispatch(request, *args, **kwargs)


class JobTitleManageView(LoginRequiredMixin, TemplateView):
    template_name = 'job_title_manage.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        elif not request.user.is_superuser:
            return HttpResponse('Only superuser can access this page.')
        return super().dispatch(request, *args, **kwargs)
