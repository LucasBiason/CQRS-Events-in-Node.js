# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: cart.proto

import sys
_b=sys.version_info[0]<3 and (lambda x:x) or (lambda x:x.encode('latin1'))
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor.FileDescriptor(
  name='cart.proto',
  package='',
  syntax='proto3',
  serialized_options=None,
  serialized_pb=_b('\n\ncart.proto\"\x88\x01\n\x04\x43\x61rt\x12\n\n\x02id\x18\x01 \x01(\t\x12\r\n\x05total\x18\x02 \x01(\x02\x12\x1f\n\x08products\x18\x03 \x03(\x0b\x32\r.Cart.Product\x1a\x44\n\x07Product\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\r\n\x05price\x18\x03 \x01(\x02\x12\x10\n\x08quantity\x18\x04 \x01(\x03\x62\x06proto3')
)




_CART_PRODUCT = _descriptor.Descriptor(
  name='Product',
  full_name='Cart.Product',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='Cart.Product.id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='name', full_name='Cart.Product.name', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='price', full_name='Cart.Product.price', index=2,
      number=3, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='quantity', full_name='Cart.Product.quantity', index=3,
      number=4, type=3, cpp_type=2, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=83,
  serialized_end=151,
)

_CART = _descriptor.Descriptor(
  name='Cart',
  full_name='Cart',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='Cart.id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=_b("").decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='total', full_name='Cart.total', index=1,
      number=2, type=2, cpp_type=6, label=1,
      has_default_value=False, default_value=float(0),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
    _descriptor.FieldDescriptor(
      name='products', full_name='Cart.products', index=2,
      number=3, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR),
  ],
  extensions=[
  ],
  nested_types=[_CART_PRODUCT, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=15,
  serialized_end=151,
)

_CART_PRODUCT.containing_type = _CART
_CART.fields_by_name['products'].message_type = _CART_PRODUCT
DESCRIPTOR.message_types_by_name['Cart'] = _CART
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

Cart = _reflection.GeneratedProtocolMessageType('Cart', (_message.Message,), dict(

  Product = _reflection.GeneratedProtocolMessageType('Product', (_message.Message,), dict(
    DESCRIPTOR = _CART_PRODUCT,
    __module__ = 'cart_pb2'
    # @@protoc_insertion_point(class_scope:Cart.Product)
    ))
  ,
  DESCRIPTOR = _CART,
  __module__ = 'cart_pb2'
  # @@protoc_insertion_point(class_scope:Cart)
  ))
_sym_db.RegisterMessage(Cart)
_sym_db.RegisterMessage(Cart.Product)


# @@protoc_insertion_point(module_scope)