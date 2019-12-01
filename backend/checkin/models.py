from django.db import models
from datetime import datetime


class CheckIn(models.Model):
    guest_name = models.CharField(max_length=400)
    guest_phone = models.IntegerField()
    guest_email = models.EmailField()
    host_name = models.CharField(max_length=400)
    host_phone = models.IntegerField()
    host_email = models.EmailField()
    checkout = models.BooleanField(default=False)
    checkin_time = models.DateTimeField(default=datetime.now, blank=True)
    checkout_time = models.DateTimeField(default=datetime.now, blank=True)

    def _str_(self):
        return self.guest_name
