from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("accounts", views.AccountViewSet, basename="account")
router.register("users", views.UserViewSet, basename="user")

urlpatterns = [
    path('', include(router.urls))
]