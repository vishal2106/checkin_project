from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
from rest_framework import viewsets
from datetime import datetime
import requests
import json
from .serializers import CheckInSerializer
from .models import CheckIn
from rest_framework.response import Response


class CheckInView(viewsets.ViewSet):
    serializer_class = CheckInSerializer
    def list(self, request):

        queryset = CheckIn.objects.all()
        serializer = CheckInSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        isCheckout = self.request.query_params.get('val')
        pk_id = self.request.query_params.get('id')
        isDelete = self.request.query_params.get('delete')
        # guest_name = self.request.data['guest_name']
        # guest_phone = self.request.data['guest_phone']
        # guest_email = self.request.data['guest_email']
        # host_name = self.request.data['host_name']
        # host_phone = self.request.data['host_phone']
        # host_email = self.request.data['host_email']

        if(isCheckout and int(isCheckout) == 1):
            recipient_list = []
            email_from = settings.EMAIL_HOST_USER
            CheckIn.objects.filter(id=pk_id).update(
                checkout=True, checkout_time=datetime.now())
            details = CheckIn.objects.get(id=pk_id)
            checkin_time = details.checkin_time
            checkout_time = details.checkout_time
            subject = '[no-reply] Here are your meeting details!'
            message = 'Hello, '+str(details.guest_name)+',\n'\
                'Here are your meeting details with '+str(details.host_name)+'\n'\
                'Guest Name: '+str(details.guest_name)+'\n'\
                'Guest Phone: '+str(details.guest_phone)+'\n'\
                'Guest Email: '+str(details.guest_email)+'\n'\
                '\n'\
                'Host Name: '+str(details.host_name)+'\n'\
                'Host Phone: '+str(details.host_phone)+' ,\n'\
                'Host Email: '+str(details.host_email)+' ,\n'\
                '\n'\
                'Check In Time: '+str(checkin_time)+' ,\n'\
                'Check Out Time: ' + str(checkout_time)+' ,\n'\
                '\n'\
                'Thank You for your Visit!'
            recipient_list.append(details.guest_email)

            send_mail(subject, message, email_from, recipient_list)
            print('Email Sent!')

            def sendPostRequest(reqUrl, apiKey, secretKey, useType, phoneNo, senderId, textMessage):
                req_params = {
                    'apikey': apiKey,
                    'secret': secretKey,
                    'usetype': useType,
                    'phone': phoneNo,
                    'message': textMessage,
                    'senderid': senderId
                }
                return requests.post(reqUrl, req_params)
            URL = 'https://www.way2sms.com/api/v1/sendCampaign'
            response = sendPostRequest(URL, 'TQ7P8AO62CQEU79QUXZPT9DDCX7PETC1',
                                       '54RTL00C1ACN2A70', 'stage', details.guest_phone, 'CHECKIN', message)
            print(response.text)

        elif(isDelete and int(isDelete) == 1):
            CheckIn.objects.filter(id=pk_id).delete()
        else:
            recipient_list = []
            email_from = settings.EMAIL_HOST_USER

            guest_name = self.request.data['guest_name']
            guest_phone = self.request.data['guest_phone']
            guest_email = self.request.data['guest_email']
            host_name = self.request.data['host_name']
            host_phone = self.request.data['host_phone']
            host_email = self.request.data['host_email']

            subject = '[no-reply] You have a visitor'
            message = 'Hello, '+host_name+',\n'\
                ''+guest_name+' has just checked in!\n'\
                'Here are, '+guest_name+' details:\n'\
                'Email: '+guest_email+'\nPhone: '+guest_phone

            CheckIn.objects.create(guest_name=guest_name, guest_phone=guest_phone, guest_email=guest_email,
                                   host_name=host_name, host_phone=host_phone, host_email=host_email, checkin_time=datetime.now())

            recipient_list.append(host_email)

            send_mail(subject, message, email_from, recipient_list)
            print('Email Sent!')

            def sendPostRequest(reqUrl, apiKey, secretKey, useType, phoneNo, senderId, textMessage):
                req_params = {
                    'apikey': apiKey,
                    'secret': secretKey,
                    'usetype': useType,
                    'phone': phoneNo,
                    'message': textMessage,
                    'senderid': senderId
                }
                return requests.post(reqUrl, req_params)
            URL = 'https://www.way2sms.com/api/v1/sendCampaign'
            response = sendPostRequest(URL, 'TQ7P8AO62CQEU79QUXZPT9DDCX7PETC1',
                                       '54RTL00C1ACN2A70', 'stage', host_phone, 'CHECKIN', message)
            print(response.text)
        queryset = CheckIn.objects.all()
        serializer = CheckInSerializer(queryset, many=True)
        return Response(serializer.data)
