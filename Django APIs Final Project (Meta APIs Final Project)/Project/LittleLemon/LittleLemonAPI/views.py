from decimal import Decimal
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, User
from django.core.exceptions import PermissionDenied
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle

from .models import Cart, Category, MenuItem, Order, OrderItem
from .serializers import CartSerializer, CategorySerializer, MenuItemSerializer, OrderItemSerializer, OrderSerializer

# Custom permission classes to make things easier.
class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Manager').exists() or request.user.is_superuser

class IsDeliveryCrew(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Delivery crew').exists() or request.user.is_superuser

# Create your views here.
class CategoriesView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return [IsAuthenticated(), IsManager()]

class SingleCategoryView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return [IsAuthenticated(), IsManager()]


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

    def clear_featured(self, request):
        # If setting the "featured" field to "true":
        if {"featured"} <= request.data.keys() and request.data.get("featured") == "true":
            # Get all items that already have it set to "true",
            featured_items = MenuItem.objects.all().filter(featured=True)
            # Set it to "false" for each of them.
            for item in featured_items:
                serialized_item = self.get_serializer(item, data={"featured": "false"}, partial=True)
                serialized_item.is_valid()
                self.perform_update(serialized_item)

    def put(self, request, *args, **kwargs):
        # If setting "featured" to "true", everything that already has it as "true"
        # should change it to "false".
        self.clear_featured(request)
        # Only then should the request go through.
        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        # If setting "featured" to "true", everything that already has it as "true"
        # should change it to "false".
        self.clear_featured(request)
        # Only then should the request go through.
        return super().patch(request, *args, **kwargs)

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
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def get_permissions(self):
        if self.request.method == "DELETE":
            return [IsAuthenticated(), IsManager()]
        return [IsAuthenticated()]

    def get(self, request, *args, **kwargs):
        order = super().get(request, *args, **kwargs)
        if request.user.pk == order.data.get("user"):
            return order
        return Response({"message": "That's not your order."}, status.HTTP_403_FORBIDDEN)

    def update_checks(self, request, pk):
        # The customer should only be able to update the date and the order items,
        # while the total should update itself automatically if the order items
        # change. If a customer tries to update any fields that they shouldn't be
        # able to - including trying to directly update the total - or if they try
        # to update someone else's order, they should get a 403 error.
        order = Order.objects.get(id=pk)
        serialized_order = OrderSerializer(order)
        if serialized_order.data.get('user') != request.user.pk:
            raise PermissionDenied("You can only modify your own orders.")
        if not request.data.keys() <= {'date', 'orderitems'}:
            raise PermissionDenied("You can only update the date and items of an order, and the total will update on its own if the items change.")
        # At this point, they are cleared to make the update.
        total = serialized_order.data.get('total')
        # If they're updating the orderitems,
        if request.data.keys() <= {'orderitems'}:
            # Extract them into a list,
            new_orderitems = list(request.data.get('orderitems'))
            # Get the queryset of existing orderitems,
            orderitems = OrderItem.objects.all().filter(order=order)
            # Remove every item in the queryset.
            for item in orderitems:
                item.delete()
            # Add every item from the list to the queryset.
            total = 0
            for item in new_orderitems:
                orderitem_data = {
                    'order': order,
                    'menuitem': item.get("menuitem"),
                    'quantity': item.get("quantity"),
                    'unit_price': item.get("unit_price"),
                    'price': Decimal(item.get("quantity")) * Decimal(item.get("unit_price"))
                }
                serialized_orderitem = OrderItemSerializer(data=orderitem_data)
                serialized_orderitem.is_valid(raise_exception=True)
                serialized_orderitem.save()
                total += serialized_orderitem.data.get("price")
        # Return the total for the order.
        return total

    def put(self, request, pk, *args, **kwargs):
        # Only customer needs to call this method.
        try:
            total = self.update_checks(request, pk)
        # If the update-checking logic had an authorization problem, return a 403 error.
        except PermissionDenied as denied:
            return Response({"message": denied.args[0]}, 403)
        # If the update-checking logic did not have a problem, then the actual
        # update can procede. (In fact, the update logic includes the part where
        # the orderitems are updated, if they are, so all that's left is the rest
        # of the order.)
        data = {
            'user': request.user.pk,
            'total': total,
            'date': request.data.get('date'),
        }
        # Much like with the POST method in the OrdersView, I based this off of
        # the code for the underlying PUT method because I didn't know how else
        # to do what I wanted.
        instance = self.get_object()
        serialized_item = self.get_serializer(instance, data=data, partial=False)
        serialized_item.is_valid(raise_exception=True)
        self.perform_update(serialized_item)
        return Response(serialized_item.data)

    def patch(self, request, pk, *args, **kwargs):
        # If called by the manager, they can update anyone's order, but only the
        # delivery crew and status fields. If they try to update anything else,
        # they get a 403 error.
        if self.request.user.groups.filter(name='Manager').exists():
            if request.data.keys() <= {'delivery_crew', 'status'}:
                return super().patch(request, *args, **kwargs)
            return Response({"message": "Managers can only update the delivery crew or status of an order."}, 403)
        # If called by the delivery crew, they can only update orders that have
        # been assigned to them, and can only update the status of those orders.
        # If they try anything else, they get a 403 error.
        elif self.request.user.groups.filter(name='Delivery crew').exists():
            order = Order.objects.get(id=pk)
            serialized_order = OrderSerializer(order)
            if (serialized_order.data.get('delivery_crew') != request.user.pk):
                return Response({"message": "You can only modify orders that you have been assigned to."}, 403)
            if request.data.keys() <= {'status'}:
                return super().patch(request, *args, **kwargs)
            return Response({"message": "Delivery crewmwmbers can only update the status of an order."}, 403)
        # If called by the customer, works like put().
        try:
            total = self.update_checks(request, pk)
        # If the update-checking logic had an authorization problem, return a 403 error.
        except PermissionDenied as denied:
            return Response({"message": denied.args[0]}, 403)
        # If the update-checking logic did not have a problem, then the actual
        # update can procede. (In fact, the update logic includes the part where
        # the orderitems are updated, if they are, so all that's left is the rest
        # of the order.)
        data = {
            'user': request.user.pk,
            'total': total,
            'date': request.data.get('date'),
        }
        # Much like with the POST method in the OrdersView, I based this off of
        # the code for the underlying PUT method because I didn't know how else
        # to do what I wanted.
        instance = self.get_object()
        serialized_item = self.get_serializer(instance, data=data, partial=True)
        serialized_item.is_valid(raise_exception=True)
        self.perform_update(serialized_item)
        return Response(serialized_item.data)