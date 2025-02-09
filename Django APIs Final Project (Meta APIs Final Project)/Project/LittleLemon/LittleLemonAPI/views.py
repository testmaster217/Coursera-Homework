from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, User
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .models import Cart, MenuItem, Order
from .serializers import CartSerializer, MenuItemSerializer, OrderItemSerializer, OrderSerializer

# Custom permission classes to make things easier.
class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Manager').exists() or request.user.is_superuser

class IsDeliveryCrew(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Delivery crew').exists() or request.user.is_superuser

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
    permission_classes = [IsAuthenticated]
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

class OrdersView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_queryset(self):
        if self.request.user.groups.filter(name='Manager').exists():
            return super().get_queryset()
        elif self.request.user.groups.filter(name='Delivery crew').exists():
            return Order.objects.all().filter(delivery_crew=self.request.user)
        return Order.objects.all().filter(user=self.request.user)

    def post(self, request, *args, **kwargs):
        # Get the user's cart.
        # (Logic based on the CartView's under-the-hood "get" method because
        # I could not figure out how to call the API endpoint the proper way.)
        cart_queryset = Cart.objects.all().filter(user=self.request.user)
        cart = CartSerializer(cart_queryset, many=True).data
        # For each item in the cart, add its price to a 'total' variable.
        total = 0
        for item in cart:
            total += Decimal(item.get("price"))
        # Use the 'total' variable and some other needed information to build
        # the data to create a new order, similar to how I did the POST method
        # for the CartView.
        data = {
            'user': request.user.pk,
            'total': total,
            'date': request.data.get('date'),
        }
        serialized_item = self.get_serializer(data=data)
        serialized_item.is_valid(raise_exception=True)
        serialized_item.save()
        # After creating the order, create an orderitem from each item in the cart,
        # and then empty the cart.
        for item in cart:
            orderitem_data = {
                'order': serialized_item.data.get("id"),
                'menuitem': item.get("menuitem"),
                'quantity': item.get("quantity"),
                'unit_price': item.get("unit_price"),
                'price': item.get("price")
            }
            serialized_orderitem = OrderItemSerializer(data=orderitem_data)
            serialized_orderitem.is_valid(raise_exception=True)
            serialized_orderitem.save()
        # (Deletion logic copied from the CartView's "delete" method for the
        # same reason that I copied the "get" logic. At least I'm copying my
        # own code this time.)
        for cart in cart_queryset:
            cart.delete()
        # Temporary return until I can get a proper one made.
        # Would like to return the created order with all of its orderitems.
        return Response({'message': "Order placed!"}, status.HTTP_201_CREATED)

class SingleOrderView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get(self, request, *args, **kwargs):
        order = super().get(request, *args, **kwargs)
        if request.user.pk == order.data.get("user"):
            return order
        return Response({"message": "That's not your order."}, status.HTTP_403_FORBIDDEN)