from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('accounts', views.AccountViewSet, basename='account')
router.register('users', views.UserViewSet, basename='user')
router.register('vaults', views.VaultViewSet, basename='vault')
router.register('invitations', views.InvitationViewSet, basename='invitation')


urlpatterns = [
    path('auth/login/', views.login_view, name='auth-login'),
    path('auth/register/', views.register_view, name='auth-register'),
    path('vaults/user/<int:user_id>/',
         views.get_vaults_for_user, name='vaults-for-user'),
    path('vaults/new/', views.create_vault, name='create-vault'),
    path('images/save/', views.save_image, name='save-image'),
    path('invitations/user/<int:user_id>/', views.get_invitations_for_user, name='invitations-for-user'),
    path('invitations/accept/<int:invitation_id>/', views.accept_invitation, name='accept-invitation'),
    path('invitations/decline/<int:invitation_id>/', views.decline_invitation, name='decline-invitation'),
    path('users/vault/<int:vault_id>/', views.get_users_for_vault, name='users-for-vault'),
    path('', include(router.urls))
]
