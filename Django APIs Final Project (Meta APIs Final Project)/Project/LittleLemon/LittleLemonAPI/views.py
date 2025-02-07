from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, User
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .models import Cart, MenuItem
from .serializers import CartSerializer, MenuItemSerializer

# Custom permission class to make things easier.
class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Manager').exists() or request.user.is_superuser

# Create your views here.
class MenuItemsView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]
    ordering_fields = ['price']
    search_fields = ['title', 'category__title']

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return [IsAuthenticated(), IsManager()]

class SingleMenuItemView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return [IsAuthenticated(), IsManager()]

# Doing these four as function-based views because I couldn't figure out
# how to do them as class-based views.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsManager])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def managers(request):
    if request.method == 'GET':
        managers = Group.objects.get(name="Manager")
        return Response([manager.username for manager in managers.user_set.all()])

    if request.method == 'POST':
        username = request.data['username']
        if username:
            user = get_object_or_404(User, username=username)
            managers = Group.objects.get(name="Manager")
            managers.user_set.add(user)
            return Response({"message": "ok"})
        return Response({"message": "username is required"}, status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsManager])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def single_manager(request, username):
    user = get_object_or_404(User, username=username)
    managers = Group.objects.get(name="Manager")
    managers.user_set.remove(user)
    return Response({"message": "ok"})

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsManager])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def delivery_crew(request):
    if request.method == 'GET':
        crew = Group.objects.get(name="Delivery crew")
        return Response([deliverer.username for deliverer in crew.user_set.all()])

    if request.method == 'POST':
        username = request.data['username']
        if username:
            user = get_object_or_404(User, username=username)
            crew = Group.objects.get(name="Delivery crew")
            crew.user_set.add(user)
            return Response({"message": "ok"})
        return Response({"message": "username is required"}, status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsManager])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def single_deliverer(request, username):
    user = get_object_or_404(User, username=username)
    crew = Group.objects.get(name="Delivery crew")
    crew.user_set.remove(user)
    return Response({"message": "ok"})

class CartView(generics.ListCreateAPIView, generics.DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_queryset(self):
        return Cart.objects.all().filter(user=self.request.user)

    # GET method doesn't need to change.

    def post(self, request, *args, **kwargs):
        data = {
            'user': request.user.pk,
            'menuitem': request.data.get('menuitem'),
            'quantity': request.data.get('quantity'),
            'unit_price': request.data.get('unit_price'),
            'price': Decimal(request.data.get('quantity')) * Decimal(request.data.get('unit_price'))
        }
        serialized_item = self.get_serializer(data=data)
        serialized_item.is_valid(raise_exception=True)
        serialized_item.save()
        return Response(serialized_item.data, status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        for cart in self.get_queryset():
            cart.delete()
        return Response({"message": "Your cart has been emptied."})