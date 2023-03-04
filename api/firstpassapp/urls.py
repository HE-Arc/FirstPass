from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('accounts', views.AccountViewSet, basename='account')
router.register('users', views.UserViewSet, basename='user')
router.register('vaults', views.VaultViewSet, basename='vault')

urlpatterns = [
    path('auth/login/', views.login_view, name='auth-login'),
    path('', include(router.urls))
]