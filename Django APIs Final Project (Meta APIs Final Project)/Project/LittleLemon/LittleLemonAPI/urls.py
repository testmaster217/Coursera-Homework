from django.urls import path
from . import views

urlpatterns = [
    path('menu-items', views.MenuItemsView.as_view()),
    path('menu-items/<int:pk>', views.SingleMenuItemView.as_view()),
    path('groups/manager/users', views.managers),
    path('groups/manager/users/<username>', views.single_manager),
    path('groups/delivery-crew/users', views.delivery_crew),
    path('groups/delivery-crew/users/<username>', views.single_deliverer),
    path('cart/menu-items', views.CartView.as_view()),
    path('orders', views.OrdersView.as_view()),
    path('orders/<int:pk>', views.SingleOrderView.as_view()),
]