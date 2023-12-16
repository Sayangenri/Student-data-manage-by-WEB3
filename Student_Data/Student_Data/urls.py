from django.contrib import admin
from django.urls import path
from Student_Data import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('page/',views.page,name='page'),
]
