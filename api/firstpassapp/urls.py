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
    path('users/<int:user_id>/vaults/',
         views.get_vaults_for_user, name='vaults-for-user'),
    path('vaults/', views.create_vault, name='create-vault'),
    path('vaults/<int:vault_id>/pairs/', views.route_pairs, name='pairs-by-vault-id'),
    path('vaults/<int:vault_id>/', views.vault_by_id, name='vault-by-id'),
    #path('images/', views.save_image, name='save-image'),
    path('users/<int:user_id>/invitations/',
         views.get_invitations_for_user, name='invitations-for-user'),
    path('invitations/<int:invitation_id>/accept/',
         views.accept_invitation, name='accept-invitation'),
    path('invitations/<int:invitation_id>/decline/',
         views.decline_invitation, name='decline-invitation'),
    path('invitations/', views.route_invitations, name='route-invitations'),
    path('vaults/<int:vault_id>/users/',
         views.get_users_for_vault, name='users-for-vault'),
    path('users/<int:user_id>/', views.route_user,
         name='update-user'),
    path('users/<str:username>/', views.get_user_by_username,
         name='get-user-by-username'),
    path('users/<int:user_id>/', views.route_user,
         name='get-user-by-id'),
    path('', include(router.urls))
]
