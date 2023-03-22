import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.core.files.storage import Storage
from rest_framework import viewsets
from .serializers import UserSerializer, AccountSerializer, VaultSerializer
from .models import Account, AccountVaultAccess, Vault
from .models import create_user_account, save_user_account


class AccountViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class VaultViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Vault.objects.all()
    serializer_class = VaultSerializer


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


def save_image(request):
    if request.FILES['image']:
        image = request.FILES['image']
        storage = Storage()
        storage.save(image.name, image)
        return JsonResponse(data={'image': image}, status=200)
    return JsonResponse(data={'image': None}, status=400)


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
