from django.urls import path
from . import views

urlpatterns = [
    path("", views.login, name="login"),
    path("items/", views.items, name="items"),
    path("new/", views.newItem, name="newitem"),
    path("register/", views.register, name="register")
]