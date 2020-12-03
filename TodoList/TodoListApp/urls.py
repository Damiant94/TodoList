from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path("", views.login_view, name="login"),
    path("items", views.items, name="items"),
    path("newitem", views.newitem, name="newitem"),
    path("register", views.signup, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("itemslist", views.itemslist, name="itemslist")
    # url(r'^signup/$', core_views.signup, name='signup'),
]
