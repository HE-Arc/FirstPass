# Generated by Django 4.1.5 on 2023-04-30 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('firstpassapp', '0006_alter_vault_image_path'),
    ]

    operations = [
        migrations.AddField(
            model_name='vault',
            name='users',
            field=models.ManyToManyField(through='firstpassapp.AccountVaultAccess', to='firstpassapp.account'),
        ),
    ]
