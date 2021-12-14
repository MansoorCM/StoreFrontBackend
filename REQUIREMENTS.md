# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index                         '/product' [GET]
- Show                          '/product/:id' [GET]
- Create (body: name, price, category )[token required]             '/product' [POST]
- [OPTIONAL] Top 5 most popular products                            [NOT IMPLEMENTED]
- [OPTIONAL] Products by category (args: product category)          [NOT IMPLEMENTED]

#### Users
- Index [token required]                        '/user' [GET]
- Show [token required]                         '/user/:id' [GET]   
- Create (body: firstname, lastname, password)  '/user' [POST]

#### Orders
- Create order by user  (body: id ( means userid), status as 'active') [token required]            '/order' [POST]
- Add product to active order (body: id ( means userid), quantity, productid) [token required]      '/order/product' [POST]
- Current Order by user [token required]                                                            '/order/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]                               [NOT IMPLEMENTED]

## Data Shapes
#### Products
-  id
- name
- price
- [OPTIONAL] category

Table : products (id : integer, name : varchar, price : integer, category: varchar)

#### Users
- id
- firstName
- lastName
- password_digest

Table : users (id : integer, firstname : varchar, lastname : varchar, password_digest: varchar)

#### Orders
- id
- userid
- status of order (active or complete)

Table : orders (id : integer, userid : integer (foreign key to User table), status : varchar)

#### Order_products
- id
- id of each product in the order
- quantity of each product in the order
- orderid

Table : order_products (id : integer, productid : integer (foreign key to Product table), quantity : integer, orderid : integer (foreign key to Order table))

