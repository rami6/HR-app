from django.contrib import admin
from django.urls import path, include
from .routers import router
from django.conf import settings
from django.conf.urls.static import static
from .views import home_view

urlpatterns = [
    path('', home_view),
    path('admin/', admin.site.urls),
    path('org/', include('org_structure.urls')),
    path('api/', include(router.urls)),
    path('accounts/', include('django.contrib.auth.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
