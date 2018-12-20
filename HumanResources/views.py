from django.http import HttpResponseRedirect
from django.urls import reverse


def home_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    else:
        return HttpResponseRedirect(reverse('employee_search'))
