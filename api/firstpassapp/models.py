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
    image_path = models.FilePathField()


class Pair(models.Model):
    application = models.TextField()
    username = models.TextField()
    password = models.TextField()
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)


class Invitation(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=1, choices=ACCESS_LEVEL)


class AccountVaultAccess(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    vault = models.ForeignKey(Vault, on_delete=models.CASCADE)
    access_level = models.CharField(max_length=1, choices=ACCESS_LEVEL)
