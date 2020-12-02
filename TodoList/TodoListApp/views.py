from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from .forms import UserCreateForm

# Create your views here.
def login_view(request):
  if request.method == "POST":
    username = request.POST["login"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
      login(request, user)
      return HttpResponseRedirect(reverse("items"))
    else:
      return render(request, "TodoListApp/login.html", {
        "message": "Invalid credentials."
      })

  return render(request, "TodoListApp/login.html")


def logout_view(request):
  if not request.user.is_authenticated:
    return render(request, "TodoListApp/login.html")

  logout(request)
  return render(request, "TodoListApp/login.html", {
      "message": "Logged out."
  })

def items(request):
  if not request.user.is_authenticated:
    return HttpResponseRedirect(reverse("login"))
  return render(request, "TodoListApp/items.html")

def newitem(request):
  if not request.user.is_authenticated:
    return HttpResponseRedirect(reverse("login"))
  return render(request, "TodoListApp/newitem.html")

# def register(request):
#   return render(request, "TodoListApp/register.html")





def signup(request):
  if request.method == 'POST':
    # form = UserCreationForm(request.POST)
    form = UserCreateForm(request.POST)
    if form.is_valid():
      form.save()
      username = form.cleaned_data.get('username')
      raw_password = form.cleaned_data.get('password1')
      user = authenticate(username=username, password=raw_password)
      login(request, user)
      return redirect('login')
  else:
    # form = UserCreationForm()
    form = UserCreateForm()
  return render(request, "TodoListApp/register.html", {'form': form})
