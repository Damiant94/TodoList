from django import forms
from django.utils.translation import gettext as _
from django.contrib.auth.forms import UserCreationForm


class UserCreateForm(UserCreationForm):
    username = forms.CharField(label=_("Username"))
    password1 = forms.CharField(label=_("Password"),
                                widget=forms.PasswordInput)
    password2 = forms.CharField(label=_("Password confirmation"),
                                widget=forms.PasswordInput)
