from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from cart.models import Cart
from cart.serializers import CartSerializer

class MyCartView(APIView):

    def get(self, request, cartid, format=None):
        try:
            cart = Cart.retrieve(cartid)
        except Exception:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(CartSerializer(cart).data)



