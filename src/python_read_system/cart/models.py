import logging
from django.db import models
import uuid


logger = logging.getLogger(__name__)


class Cart(models.Model):

    id = models.UUIDField(
        primary_key = True,
        default = uuid.uuid4,
        editable = True
    )
    products = models.JSONField()
    total = models.DecimalField(
        decimal_places=2,
        max_digits=10
    )

    @classmethod
    def retrieve(cls, cart_pk, **kwargs):
        try:
            logger.info(f">> Retrieving cart {cart_pk} ...")
            carts = cls.objects.filter(id=cart_pk)
            logger.info(">> Retrieved OK ...")
            return carts.get()
        except Exception as e:
            if 'silence' in kwargs:
                return None
            logger.info(f">> Cart not '{cart_pk}' found ...")
            raise Exception('CART NOT FOUND')

    @classmethod
    def get_queryset(cls, **kwargs):
        logger.info(">> Retrieving carts list...")
        queryset = cls.objects.all()
        return queryset

    @classmethod
    def perform_create(cls, data):
        logger.info(f">> Updating cart {data['id']}...")
        cart = cls.retrieve(data["id"], silence=True)
        if not cart:
            cart = cls()
            cart.id = data["id"]

        cart.products = data.get('products')
        cart.total = data.get('total')
        cart.save()
        return cart