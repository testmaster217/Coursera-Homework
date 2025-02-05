from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
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
