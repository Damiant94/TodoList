from django.contrib import admin
from .models import Item

# Register your models here.


class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'details', 'date')
    list_filter = ('user',)


admin.site.register(Item, ItemAdmin)
