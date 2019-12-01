from rest_framework import serializers
from .models import CheckIn

class CheckInSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckIn
        fields = ('id', 'guest_name', 'guest_phone', 'guest_email', 'host_name', 'host_phone', 'host_email', 'checkout')