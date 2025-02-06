from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import Group, User
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from .serializers import MenuItemSerializer
from .models import MenuItem

# Create your views here.
class MenuItemsView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    ordering_fields = ['price']
    search_fields = ['title', 'category__title']

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return [IsAuthenticated()]

    def post(self, request, *args, **kwargs):
        if self.request.user.groups.filter(name='Manager').exists():
            return super().post(request, *args, **kwargs)
        return Response({"message": "Only managers can do that."}, 403)

class SingleMenuItemView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            return []
        return [IsAuthenticated()]

    def put(self, request, *args, **kwargs):
        if self.request.user.groups.filter(name='Manager').exists():
            return super().put(request, *args, **kwargs)
        return Response({"message": "Only managers can do that."}, 403)

    def patch(self, request, *args, **kwargs):
        if self.request.user.groups.filter(name='Manager').exists():
            return super().patch(request, *args, **kwargs)
        return Response({"message": "Only managers can do that."}, 403)

    def delete(self, request, *args, **kwargs):
        if self.request.user.groups.filter(name='Manager').exists():
            return super().delete(request, *args, **kwargs)
        return Response({"message": "Only managers can do that."}, 403)

# Custom permission class to make things easier.
class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='Manager').exists()
# Doing these two as function-based views because I couldn't figure out
# how to do them as class-based views.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsManager])
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
def single_manager(request, username):
    user = get_object_or_404(User, username=username)
    managers = Group.objects.get(name="Manager")
    managers.user_set.remove(user)
    return Response({"message": "ok"})
