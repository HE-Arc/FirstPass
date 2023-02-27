import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework import viewsets
from .serializers import UserSerializer, AccountSerializer
from .models import Account


class AccountViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({
            'errors': {'username': 'Invalid credentials'}
        }, status=400)

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return JsonResponse({}, status=200)

    return JsonResponse({
        'errors': {'username': 'Invalid credentials'}
    }, status=400)


@require_POST
def register_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')
    password_verify = data.get('verification')

    if username is None or password is None:
        return JsonResponse({
            'errors': {'username': 'Invalid credentials'}
        }, status=400)

    if password != password_verify:
        return JsonResponse({
            'errors': {'password': 'Passwords do not match'}
        }, status=400)

    user = User.objects.create_user(username, password)
    user.save()
    return JsonResponse({}, status=200)
