# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

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
- password

Table : users (id : integer, firstname : varchar, lastname : varchar, password: varchar)

#### Orders
- id
- user_id
- status of order (active or complete)

Table : orders (id : integer, user_id : integer (foreign key to User table), status : varchar)

#### Order_products
- id
- id of each product in the order
- quantity of each product in the order
- order_id

Table : order_products (id : integer, product_id : integer (foreign key to Product table), quantity : integer, order_id : integer (foreign key to Order table))

