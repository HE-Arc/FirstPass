import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from firstpass import settings

ACCESS_LEVEL = (
    ('R', 'READ'),
    ('W', 'WRITE'),
    ('O', 'OWNER')
)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


@receiver(post_save, sender=User)
def create_user_account(sender, instance, created, **kwargs):
    if created:
        Account.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_account(sender, instance, **kwargs):
    instance.account.save()


class Vault(models.Model):
    name = models.CharField(max_length=50)
    image_path = models.CharField(max_length=255)
    users = models.ManyToManyField(Account, through='AccountVaultAccess')

    def __str__(self):
        return 'Vault[id={}, name={}, image_path={}]'.format(self.id, self.name, self.image_path)


class Pair(models.Model):
    application = models.TextField()
    username = models.TextField()
    password = models.TextField()
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)

    def __str__(self):
        return 'Pair[id={}, application={}, username={}, password={}]'.format(self.id, self.application, self.username, self.password)


class Invitation(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=1, choices=ACCESS_LEVEL)

    def __str__(self):
        return 'Invitation[id={}, account={}, vault={}, access_level={}]'.format(self.id, self.account, self.vault, self.access_level)


class AccountVaultAccess(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=1, choices=ACCESS_LEVEL)

    def __str__(self):
        return 'AccountVaultAccess[id={}, account={}, vault={}, access_level={}]'.format(self.id, self.account, self.vault, self.access_level)
