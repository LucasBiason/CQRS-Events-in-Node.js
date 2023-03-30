from django.urls import path

from . import views

urlpatterns = [
    path('<str:cartid>/', views.MyCartView.as_view()),
]

