from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('accounts', views.AccountViewSet, basename='account')
router.register('users', views.UserViewSet, basename='user')

urlpatterns = [
    path('auth/login/', views.login_view, name='auth-login'),
    path('auth/register/', views.register_view, name='auth-register'),
    path('', include(router.urls))
]