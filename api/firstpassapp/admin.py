from django.contrib import admin
from .models import Account, Vault, Invitation, Pair, AccountVaultAccess

admin.site.register(Account)
admin.site.register(Vault)
admin.site.register(Invitation)
admin.site.register(Pair)
admin.site.register(AccountVaultAccess)