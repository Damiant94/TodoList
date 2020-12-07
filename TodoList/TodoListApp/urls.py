from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path("", views.login_view, name="login"),
    path("items", views.items_view, name="items"),
    path("newitem", views.new_item_view, name="newitem"),
    path("register", views.signup_view, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("itemslist", views.itemslist_api, name="itemslist")
]
