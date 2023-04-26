import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.core.files.storage import Storage
from rest_framework import viewsets
from .serializers import UserSerializer, AccountSerializer, VaultSerializer, InvitationSerializer
from .models import Account, AccountVaultAccess, Pair, Vault, Invitation
from .models import create_user_account, save_user_account


class AccountViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class VaultViewSet(viewsets.ViewSet):
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer


class InvitationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer

def route_user(request, user_id):
    if request.method == 'GET':
        return get_user_by_id(request, user_id)
    elif request.method == 'POST':
        return update_user(request, user_id)
    else:
        return JsonResponse({
            'errors': ['Method not allowed ' + request.method]
        }, status=405)


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({
            'errors': ['Invalid credentials']
        }, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        jsonUser = {'id': user.id, 'username': user.username}
        return JsonResponse(data={'user': jsonUser}, status=200)

    return JsonResponse({
        'errors': ['Invalid credentials']
    }, status=400)


@require_POST
def register_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    password_verify = data.get('verification')

    if username is None or password is None or password != password_verify:
        return JsonResponse({
            'errors': ['Invalid credentials']
        }, status=400)

    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'errors': ['User already exists']
        }, status=400)

    user = User.objects.create_user(username=username, password=password)
    user.save()
    jsonUser = {'id': user.id, 'username': user.username}
    return JsonResponse(data={'user': jsonUser}, status=200)


@require_POST
def create_vault(request):
    data = json.loads(request.body)
    name = data.get('name')
    path = data.get('path')
    userID = data.get('userID')
    vault = Vault.objects.create(name=name, image_path=path)
    user = User.objects.get(id=userID)
    account = Account.objects.get(user=user)
    # vault = Vault.objects.get(name=name, image_path=path)
    AccountVaultAccess.objects.create(
        account=account, vault=vault, access_level="O")
    jsonVault = {'id': vault.id, 'name': vault.name,
                 'image_path': vault.image_path}
    return JsonResponse(data={'vault': jsonVault}, status=200)


@require_POST
def save_image(request):
    if request.FILES['image']:
        image = request.FILES['image']
        storage = Storage()
        storage.save(image.name, image)
        return JsonResponse(data={'image': image}, status=200)
    return JsonResponse(data={'image': None}, status=400)


@require_GET
def get_vaults_for_user(request, user_id):
    user = User.objects.get(id=user_id)
    account = Account.objects.get(user=user)
    account_vaults = AccountVaultAccess.objects.filter(account=account)
    vaults = []
    for account_vault in account_vaults:
        vaults.append(account_vault.vault)
    jsonVaults = []
    for vault in vaults:
        jsonVaults.append({'id': vault.id, 'name': vault.name,
                           'image_path': vault.image_path})
    return JsonResponse(data={'vaults': jsonVaults}, status=200)


@require_GET
def get_invitations_for_user(request, user_id):
    user = User.objects.get(id=user_id)
    account = Account.objects.get(user=user)
    invitations = Invitation.objects.filter(account=account)
    jsonInvitations = []
    for invitation in invitations:
        jsonInvitations.append({'id': invitation.id, 'account': invitation.account.id,
                               'vault': invitation.vault.id, 'access_level': invitation.access_level})
    return JsonResponse(data={'invitations': jsonInvitations}, status=200)


@require_POST
def accept_invitation(request, invitation_id):
    invitation = Invitation.objects.get(id=invitation_id)
    account = invitation.account
    vault = invitation.vault
    access_level = invitation.access_level
    AccountVaultAccess.objects.create(
        account=account, vault=vault, access_level=access_level)
    invitation.delete()
    return JsonResponse(data={'invitation': invitation.id}, status=200)


@require_POST
def decline_invitation(request, invitation_id):
    invitation = Invitation.objects.get(id=invitation_id)
    invitation.delete()
    return JsonResponse(data={'invitation': invitation.id}, status=200)


@require_GET
def get_users_for_vault(request, vault_id):
    vault = Vault.objects.get(id=vault_id)
    account_vaults = AccountVaultAccess.objects.filter(vault=vault)
    accounts = []
    for account_vault in account_vaults:
        accounts.append(account_vault.account)
    users = []
    for account in accounts:
        users.append(account.user)
    jsonUsers = []
    for user in users:
        jsonUsers.append({'id': user.id, 'username': user.username})
    return JsonResponse(data={'users': jsonUsers}, status=200)


def route_invitations(request):
    if request.method == 'GET':
        return get_invitations(request)
    elif request.method == 'POST':
        return send_invitation(request)
    else:
        return JsonResponse({
            'errors': ['Method not allowed ' + request.method]
        }, status=405)


@require_GET
def get_invitations(request):
    invitations = Invitation.objects.all()
    jsonInvitations = []
    for invitation in invitations:
        jsonInvitations.append({'id': invitation.id, 'account': invitation.account.id,
                               'vault': invitation.vault.id, 'access_level': invitation.access_level})
    return JsonResponse(data={'invitations': jsonInvitations}, status=200)


@require_POST
def send_invitation(request):
    data = json.loads(request.body)
    accountID = data.get('accountID')
    vaultID = data.get('vaultID')
    accessLevel = data.get('accessLevel')
    account = Account.objects.get(id=accountID)
    vault = Vault.objects.get(id=vaultID)
    invitation = Invitation.objects.create(
        account=account, vault=vault, access_level=accessLevel)
    jsonInvitation = {'id': invitation.id, 'account': invitation.account.id,
                      'vault': invitation.vault.id, 'access_level': invitation.access_level}
    return JsonResponse(data={'invitation': jsonInvitation}, status=200)


def route_vaults(request, vault_id):
    if request.method == 'GET':
        return get_vault_by_id(request, vault_id)
    elif request.method == 'POST':
        return update_vault_by_id(request, vault_id)
    else:
        return JsonResponse({
            'errors': ['Method not allowed ' + request.method]
        }, status=405)


@require_GET
def get_vault_by_id(request, vault_id):
    vault = Vault.objects.get(id=vault_id)
    jsonVault = {'id': vault.id, 'name': vault.name,
                 'image_path': vault.image_path}
    return JsonResponse(data={'vault': jsonVault}, status=200)

@require_POST
def update_vault_by_id(request, vault_id):
    data = json.loads(request.body)
    name = data.get('name')
    image_path = data.get('image_path')
    vault = Vault.objects.get(id=vault_id)
    vault.name = name
    vault.image_path = image_path
    vault.save()
    jsonVault = {'id': vault.id, 'name': vault.name,
                 'image_path': vault.image_path}
    return JsonResponse(data={'vault': jsonVault}, status=200)


def route_pairs(request, vault_id):
    if request.method == 'GET':
        return get_pairs(request, vault_id)
    elif request.method == 'POST':
        return add_pair(request, vault_id)
    return JsonResponse(data={'error': 'Invalid request'}, status=400)


@require_GET
def get_pairs(request, vault_id):
    vault = Vault.objects.get(id=vault_id)
    pairs = Pair.objects.filter(vault=vault)
    jsonPairs = []
    for pair in pairs:
        jsonPairs.append({'id': pair.id, 'application': pair.application,
                          'username': pair.username, 'password': pair.password})
    return JsonResponse(data={'pairs': jsonPairs}, status=200)


@require_POST
def add_pair(request, vault_id):
    data = json.loads(request.body)
    application = data.get('application')
    username = data.get('username')
    password = data.get('password')
    vault = Vault.objects.get(id=vault_id)
    pair = Pair.objects.create(
        application=application, username=username, password=password, vault=vault)
    jsonPair = {'id': pair.id, 'application': pair.application,
                'username': pair.username, 'password': pair.password}
    return JsonResponse(data={'pair': jsonPair}, status=200)


@require_POST
def update_user(request, user_id):
    data = json.loads(request.body)
    username = data.get('username')
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')
    user = User.objects.get(id=user_id)
    if user.check_password(old_password):
        if new_password == confirm_password:
            user.username = username
            user.set_password(new_password)
            user.save()
            jsonUser = {'id': user.id, 'username': user.username}
            return JsonResponse(data={'user': jsonUser}, status=200)
        return JsonResponse(data={'error': "Passwords do not match"}, status=400)
    return JsonResponse(data={'error': "Invalid password"}, status=400)


@require_GET
def get_user_by_username(request, username):
    user = User.objects.get(username=username)
    jsonUser = {'id': user.id, 'username': user.username}
    return JsonResponse(data={'user': jsonUser}, status=200)


@require_GET
def get_user_by_id(request, user_id):
    user = User.objects.get(id=user_id)
    jsonUser = {'id': user.id, 'username': user.username}
    return JsonResponse(data={'user': jsonUser}, status=200)
