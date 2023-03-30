import logging
import asyncio
import pulsar
from django.conf import settings
from django.core.management.base import BaseCommand
from cart import handlers

logger = logging.getLogger(__name__)

HANDLERS = {
    "CartUpdateEvent" : handlers.update_cart,
    "CartUpdateEventTestSecondClient" : handlers.update_cart
}

async def activate_consumer(topic):
    client = pulsar.Client(settings.TCP_MESSAGES)
    logger.info(f"> Connected to {settings.TCP_MESSAGES}")
    consumer = client.subscribe(topic, f'subscribe-{topic}')
    while True:
        msg_received = consumer.receive()
        try:
            logger.info(f">> Received Message for Topic {topic} ... send to handler")
            handler_class = HANDLERS.get(topic)
            handler_class(msg_received.data())
            consumer.acknowledge(msg_received)
        except Exception:
            consumer.nagative_acknowledge(msg_received)
    client.close()


class Command(BaseCommand):
    help = 'Start Event Listen for ZMQ'

    def handle(self, *args, **options):
        logger.info(f"> Preparing listeners ...")

        for key_handler in HANDLERS.keys():
            logger.info(f">> Subscribed at {key_handler}")
            asyncio.run(activate_consumer(key_handler))
