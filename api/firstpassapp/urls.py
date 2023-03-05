from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('accounts', views.AccountViewSet, basename='account')
router.register('users', views.UserViewSet, basename='user')
router.register('vaults', views.VaultViewSet, basename='vault')

urlpatterns = [
    path('auth/login/', views.login_view, name='auth-login'),
    path('auth/register/', views.register_view, name='auth-register'),
    path('vaults/user/<int:user_id>/',
         views.get_vaults_for_user, name='vaults-for-user'),
    path('vaults/new/', views.create_vault, name='create-vault'),
    path('images/save/', views.save_image, name='save-image'),
    path('', include(router.urls))
]
