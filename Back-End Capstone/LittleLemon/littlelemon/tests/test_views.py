from django.test import TestCase

from restaurant.models import MenuItem
from restaurant.serializers import MenuItemSerializer

class MenuItemViewTest(TestCase):
    test_data = [
        {
            "title": "Item1",
            "price": "0.99",
            "inventory": "10"
        },
        {
            "title": "Item2",
            "price": "2.99",
            "inventory": "5"
        },
        {
            "title": "Item3",
            "price": "9.49",
            "inventory": "7"
        }
    ]

    def setUp(self):
        super().setUp()
        for item in self.test_data:
            MenuItem.objects.create(title=item['title'], price=item['price'], inventory=item['inventory'])

    def test_get_all(self):
        items = MenuItem.objects.all()
        serialized_items = MenuItemSerializer(items, many=True)
        for i, item in enumerate(serialized_items.data):
            self.assertEqual(item['title'], self.test_data[i]['title'])
            self.assertEqual(str(item['price']), self.test_data[i]['price'])
            self.assertEqual(str(item['inventory']), self.test_data[i]['inventory'])
