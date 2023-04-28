from .defaults import *
DEBUG = True

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5173",
    "https://127.0.0.1:5173",
    "http://localhost:5173",
    "https://localhost:5173",
    "http://127.0.0.1:8000",
    "https://127.0.0.1:8000",
    "http://localhost:8000",
    "https://localhost:8000",
]

CORS_ALLOW_CREDENTIALS = True

CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
