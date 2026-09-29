from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views

from poll import views as poll_views
from poll import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index_view, name='index'),
    path('', poll_views.home, name='home'),
    path('create/', poll_views.create, name='create'),
    path('results/<int:poll_id>/', poll_views.results, name='results'),
    path('vote/<int:poll_id>/', poll_views.vote, name='vote'),
    path('register/', poll_views.register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='poll/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
]

