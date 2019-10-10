DROP DATABASE IF EXISTS bamazon_db; 

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
	);
    
INSERT INTO products (product_name, department_name, price, stock_quantity) 
	VALUES ("Shirt", "Clothing", 25.75, 50), 
		("Pants", "Clothing", 40.25, 60),
        ("Sneakers", "Shoes", 55.00, 80),
        ("Knee High Boots", "Shoes", 120.89, 30),
        ("Coffee Maker", "Kitchen", 67.49, 40),
        ("Pillows Set of 2", "Home", 35.40, 10),
        ("Vitamins", "Health", 16.89, 20),
        ("Flat Screen TV", "Electronics", 619.25, 24),
        ("Wireless Headphones", "Electronics", 99.95, 30),
        ("Laptop Sleeve", "Electronic Accessories", 20.75, 45);

SELECT * FROM products;

SELECT item_id, stock_quantity FROM products;

