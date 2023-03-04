from rest_framework import serializers
from django.contrib.auth.models import User
from .models import User, Account, Vault, Invitation, Pair, AccountVaultAccess

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = [
            "user"
        ]

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            "url",
            "id",
            "username",
        ]
        
class VaultSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vault
        fields = [
            "name",
            "image_path"
        ]