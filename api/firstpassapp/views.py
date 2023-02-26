from django.contrib.auth.models import User
from rest_framework import viewsets
from .serializers import UserSerializer, AccountSerializer
from .models import Account

class AccountViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
