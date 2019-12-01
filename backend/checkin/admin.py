from django.contrib import admin
from .models import CheckIn 

class CheckInAdmin(admin.ModelAdmin): 
    list_display = ('guest_name', 'guest_phone', 'guest_email', 'host_name', 'host_phone', 'host_email', 'checkout')

# Register your models here.
admin.site.register(CheckIn, CheckInAdmin)