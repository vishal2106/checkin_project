from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from checkin import views 

router = routers.DefaultRouter()                      
router.register(r'checkin',views.CheckInView, 'checkin')    

urlpatterns = [
    path('admin/', admin.site.urls),         
    path('api/', include(router.urls))                
]