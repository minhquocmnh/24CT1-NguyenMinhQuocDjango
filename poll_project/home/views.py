from django.shortcuts import render, redirect
from .forms import RegistrationForm

def index(request):
    return render(request, 'poll/base.html')

def register(request):
    form = RegistrationForm()
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
    return render(request, 'poll/register.html', {'form': form})