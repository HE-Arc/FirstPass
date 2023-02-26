from .defaults import *
DEBUG = False

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

def get_db_datas():
    data = {}
    appconfigRoot = '../../../../appconfig/'
    with open(appconfigRoot + 'postgres-database', 'r') as database:
        data['name'] = database.read()
    with open(appconfigRoot + 'postgres-host', 'r') as host:
        data['host'] = host.read()
    with open(appconfigRoot + 'postgres-port', 'r') as port:
        data['port'] = port.read()
    with open(appconfigRoot + 'postgres-user', 'r') as user:
        data['user'] = user.read()
    with open(appconfigRoot + 'postgres-password', 'r') as password:
        data['password'] = password.read()
    return data

db_datas = get_db_datas()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': db_datas['database'],
        'USER': db_datas['user'],
        'PASSWORD': db_datas['password'],
        'HOST': db_datas['host'],
        'PORT': db_datas['port'],
    }
}

SECRET_KEY = db_datas['password']

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "root": {"level": "INFO", "handlers": ["file"]},
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": "/var/log/django.log",
            "formatter": "app",
        },
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": "INFO",
            "propagate": True
        },
    },
    "formatters": {
        "app": {
            "format": (
                u"%(asctime)s [%(levelname)-8s] "
                "(%(module)s.%(funcName)s) %(message)s"
            ),
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
}
