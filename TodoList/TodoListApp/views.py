from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from .forms import UserCreateForm
from .models import Item
import time

# import logging
# logger = logging.getLogger(__name__)


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
                "message": "Invalid login or password."
            })
    return render(request, "TodoListApp/login.html")


def logout_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    logout(request)
    return render(request, "TodoListApp/login.html", {
        "message": "Logged out."
    })


def items_view(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    if request.method == "POST":
        if (request.POST.get("add-10-items")):
            name = "Battle of Grunwald"
            details = "The Battle of Grunwald, Battle of Žalgiris or First Battle of Tannenberg was fought on 15 July 1410 during the Polish–Lithuanian–Teutonic War. The alliance of the Crown of the Kingdom of Poland and the Grand Duchy of Lithuania, led respectively by King Władysław II Jagiełło (Jogaila) and Grand Duke Vytautas, decisively defeated the German–Prussian Teutonic Knights, led by Grand Master Ulrich von Jungingen. Most of the Teutonic Knights' leadership were killed or taken prisoner."
            date = "1410-07-15"
            for i in range(10):
                item = Item(user=request.user, name=name,
                            details=details, date=date)
                item.is_active = True
                item.save()
            return HttpResponseRedirect(reverse("items"))

        if (request.POST.get("confirm-delete-button")):
            list_to_remove = request.POST.get(
                "confirm-delete-button").split(",")
            Item.objects.filter(id__in=list_to_remove).delete()
            return HttpResponseRedirect(reverse("items"))

    return render(request, "TodoListApp/items.html", {
        "items": Item.objects.filter(user=request.user.id),
        "name": request.user.username
    })


def itemslist_api(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))

    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 2))

    items = list(Item.objects.filter(user=request.user.id).values())
    items.reverse()
    data = items[start:end+1]

    time.sleep(1)
    return JsonResponse({
        "itemslist": data
    })


def new_item_view(request):
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


def signup_view(request):
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
