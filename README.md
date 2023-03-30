# CQRS Events Lab

This project is designed to simulate a shopping cart using the CQRS architecture pattern in order to support its knowledge and learning.

A writing service will provide the commands to insert and remove items from a cart and "alert" the other services that there have been changes in the cart. The other services are read, that is, query prepared and denormalized to deliver the cart data as quickly as possible and without being affected by the concurrency of writing the data.

Project based on [CQRS: What? Why? How?](https://sderosiaux.medium.com/cqrs-what-why-how-945543482313)

### Requirements:

* docker
* docker-compose

### Quick Start

* Clone or download this repository
* Go inside of directory
```
cd src
```
* Run this command
```
docker-compose up --build --scale write_system=2
```
**Notes:**
* Option scale is optional
* If it's the first run, check the session **Initial Data for Tests**
to start the database correctly.
### Access to Containers:

Below is the list of access URLs for each service raised by compose

* **Writer Node.js**: http://0.0.0.0:4000
* **Reader Node.js**: http://0.0.0.0:3000
* **Reader Python/Django**: http://127.0.0.1:8008
* **PgAdmin**: http://localhost:5050/
    * **User**: pgadmin4@pgadmin.org
    * **Pass**: admin
    * **Add a new server in PgAdmin**:
        * **Host**: postgres
        * **Port** 5432
        * **Username**: postgres
        * **Password**: admin


### Requests

Execute at Postman Collection file: **CQRS Events in Node.postman_collection.json**

#### Queries


Get Products List (From Read DB):
```
curl --location --request GET '/products'
```

Get Cart (From Read DB):
```
curl --location --request GET '/cart/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
```

#### Commands

Add Item:
```
curl --location --request POST '/cart/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed/product/8857191f-5662-4cda-a559-b7b6c0ec471f' \
--header 'Content-Type: application/json' \
--data-raw '{
    "price": 548,
    "quantity": 1
}'
```

Remove Item:
```
curl --location --request DELETE '/cart/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed/product/8857191f-5662-4cda-a559-b7b6c0ec471f'
```


### Drill Execute Tests

```
drill --benchmark benchmarks/add_item.yml --stats # or
drill --benchmark benchmarks/get_cart.yml --stats
```


### Initial Data for Tests

For a first access, you will need to mount the necessary database.

Start compose targeting postgresql and pgadmin first:
```
docker-compose up --build postgres pgadmin
```

You will need to login via PgAdmin (see, Access to Containers) and create the databases manually.
* **cqrs-events-python** (base readable by service in python)
* **cqrs-events-read** (base for read by service on node)
* **cqrs-events-write** (base for service writing on node)

It is not necessary to create the tables, restart the compose after that the services will synchronize with the bases.

Once the tables are created and everything is correct, you can enter the first test data.
It is necessary to insert poroducts and cart, since the application only creates items (the relationship between the two)

* Products:
**Note:** The products are linked to the cart in the writing base and shown in the reading base, it is necessary to insert in both databases.
```
INSERT INTO public.product(id, name, price)
VALUES
('8857191f-5662-4cda-a559-b7b6c0ec471f', 'iPhone 9', 579),
('88755374-9d55-44fd-8bf5-076b3d14a2b4', 'iPhone X', 899),
('5c890310-fa4a-43fb-b6c5-97a3d38955b2', 'Samsung Universe 9',1249),
('2c6b8fd1-851a-4618-9eaa-b28c826ba204', 'Huawei P30', 499),
('b1bcdeff-5168-4016-b2d0-264e2675f6bc', 'XPTO 456', 1299);
```

* Cart:
```
INSERT INTO public.cart(id, total)
VALUES
('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 0);
```