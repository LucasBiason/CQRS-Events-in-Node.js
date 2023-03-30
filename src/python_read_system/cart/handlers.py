import logging
from cart.models import Cart
import src.protobuf_objects.cart_pb2 as cart_pb2

logger = logging.getLogger(__name__)

def _convert_product(product):
    return {
        "id": product.id,
		"name": product.name,
		"price": product.price,
		"quantity": product.quantity
    }

def update_cart(data):
    logger.info(">> Updating Cart ...")
    cart = cart_pb2.Cart()
    cart.ParseFromString(data)
    logger.info(f">> ID {cart.id} ...")
    cart_obj= Cart.perform_create({
        "id": cart.id,
        "products": list(map(lambda p: _convert_product(p), cart.products)),
        "total": cart.total,
    })
    logger.info(f">> Updated Cart {cart_obj.id}")

