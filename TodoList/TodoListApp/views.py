from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .forms import UserCreateForm
from .models import Item
import time

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
    return HttpResponseRedirect(reverse("login"))

  logout(request)
  return render(request, "TodoListApp/login.html", {
      "message": "Logged out."
  })

def items(request):
  if not request.user.is_authenticated:
    return HttpResponseRedirect(reverse("login"))

  if request.method == "POST":
    if (request.POST.get("add-10-items")):
      for i in [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]:
        item = Item(user=request.user, name=f"name{i}", details=f"details{i}", date="2018-07-22")
        item.is_active = True
        item.save()
      return HttpResponseRedirect(reverse("items"))

    if (request.POST.get("confirm-delete-button")):
      list_to_remove = request.POST.get("confirm-delete-button").split(",")
      Item.objects.filter(id__in = list_to_remove).delete()
      return HttpResponseRedirect(reverse("items"))
      
  return render(request, "TodoListApp/items.html", {
    "items": Item.objects.select_related().filter(user=request.user.id)
  })


def itemslist(request):
  if not request.user.is_authenticated:
    return HttpResponseRedirect(reverse("login"))

  start = int(request.GET.get("start") or 0)
  end = int(request.GET.get("end") or (start + 2))

  items = list(Item.objects.select_related().filter(user=request.user.id).values())
  items.reverse()
  data = items[start:end+1]

  time.sleep(1)

  return JsonResponse({
    "itemslist": data
  })


def newitem(request):
  if not request.user.is_authenticated:
    return HttpResponseRedirect(reverse("login"))
  
  if request.method == "POST":
    name = request.POST["name"]
    details = request.POST["details"]
    date = request.POST["date"]
    item = Item(user=request.user, name=name, details=details, date=date)
    item.is_active = True
    item.save()
    return HttpResponseRedirect(reverse("items"))

  return render(request, "TodoListApp/newitem.html")


def signup(request):
  if request.method == 'POST':
    form = UserCreateForm(request.POST)
    if form.is_valid():
      form.save()
      username = form.cleaned_data.get('username')
      raw_password = form.cleaned_data.get('password1')
      user = authenticate(username=username, password=raw_password)
      login(request, user)
      return render(request, "TodoListApp/login.html", {
        "message": "Your account has been created. Please log in."
      })
  else:
    form = UserCreateForm()
  return render(request, "TodoListApp/register.html", {'form': form})
