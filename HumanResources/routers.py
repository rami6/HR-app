from rest_framework import routers
from org_structure.viewsets import DepartmentViewSet, JobTitleViewSet, EmployeeViewSet


router = routers.DefaultRouter()
router.register(r'department', DepartmentViewSet)
router.register(r'job-title', JobTitleViewSet)
router.register(r'employee', EmployeeViewSet)