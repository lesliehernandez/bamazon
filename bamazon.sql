DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
	PRIMARY KEY (item_id),
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT DEFAULT 0
    );
    
INSERT INTO products(product_name,department_name,price,stock_quantity)
 VALUES('Womens Silver Watch','Jewelry',59.99,300), 
       ('Oral-B Toothbrush','Health & Beauty',89.99,50), 
       ('Pearl Earrings','Jewelry',562.00,25), 
       ('Echo Dot','Electronics',39.99,500), 
       ('Mens Sneakers','Shoes',29.74,80), 
       ('Sunglasses','Accessories',13.59,200), 
       ('Blender','Appliances',33.99,300), 
       ('Cat Bed','Pets',29.99,200), 
       ('Laptop','Electronics',1999.99,75), 
       ('Suitcase','Travel',80.99,50);
       
SELECT * FROM products;