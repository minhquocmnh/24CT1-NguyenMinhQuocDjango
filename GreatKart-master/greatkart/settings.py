from pathlib import Path
from django.contrib.messages import constants as messages

import environ


BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env(str(BASE_DIR / '.env'))
environ.Env.read_env(str(BASE_DIR / 'greatkart' / '.env'))
environ.Env.read_env()

SECRET_KEY = env("SECRET_KEY", default='nt(o48x3+qoygx!*=$==ul!&^4nyr8c%ybpga1p^as##_3s3__')

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'category',
    'store',
    'carts',
    'accounts',
    'orders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'greatkart.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'category.context_processors.menu_links',
                'carts.context_processors.counter',
            ],
        },
    },
]

WSGI_APPLICATION = 'greatkart.wsgi.application'

AUTH_USER_MODEL = 'accounts.Account'    # Tên model thay thế cho model user mặc định
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'


DATABASES = {
    'default': {
        'ENGINE': env("DATABASE_ENGINE", default='django.db.backends.mysql'),
        'NAME': env("DATABASE_NAME", default='greatkart'),
        'USER': env("DATABASE_USER", default='root'),
        'PASSWORD': env("DATABASE_PASSWORD", default=''),
        'HOST': env("DATABASE_HOST", default='localhost'),
        'PORT': env("DATABASE_PORT", default='3306'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = env("LANGUAGE_CODE", default='vi')

TIME_ZONE = env("TIME_ZONE", default='Asia/Ho_Chi_Minh')

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = [
    'greatkart/static'
]

# Cầu hình media file
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

MESSAGE_TAGS = {
    messages.ERROR: 'danger',
    messages.WARNING: 'warning',
    messages.INFO: 'info',
    messages.SUCCESS: 'success',
    messages.DEBUG: 'secondary'
}


EMAIL_USE_TLS = True
EMAIL_HOST = env("EMAIL_HOST", default='smtp.gmail.com')
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default='abc@gmail.com')
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default='')
EMAIL_PORT = env("EMAIL_PORT", default=587)
