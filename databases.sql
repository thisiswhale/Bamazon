CREATE DATABASE Bamazon;

use Bamazon;

-- bamazonCustomer
CREATE TABLE customer_db(
	item_id INTEGER(7) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50),
	department_name VARCHAR(50),
	price INTEGER(7),
	stock_quantity INTEGER(7),
	PRIMARY KEY(item_id)
);

INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Nintendo Switch","Electronics",300,5);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Overwatch","Video Games",40,10);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Banana blaster","Appliances",50,12);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Blendtec Bullet","Appliances",300,7);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("iPhone Galaxy 9","Electronics",500,100);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Legend of Zelda","Video Games",50,300);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("React JS, The Final Freedom","Books",300,48);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Are You My Java?","Books",10,52);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("GG EZ Pillz","Health",23,500);
INSERT INTO customer_db(product_name,department_name,price,stock_quantity) VALUES("Coffee for Coders","Health",22,420);


CREATE TABLE departments(
	department_id INTEGER(7) AUTO_INCREMENT NOT NULL PRIMARY KEY,
	department_name VARCHAR(50),
	over_head_costs INTEGER(7),
	total_sales INTEGER(7)
)

INSERT INTO departments(department_name,over_head_costs,total_sales) VALUES("Electronics","5000",0);
INSERT INTO departments(department_name,over_head_costs,total_sales) VALUES("Video Games","4000",0);
INSERT INTO departments(department_name,over_head_costs,total_sales) VALUES("Appliances","1500",0);
INSERT INTO departments(department_name,over_head_costs,total_sales) VALUES("Books","200",0);
INSERT INTO departments(department_name,over_head_costs,total_sales) VALUES("Health","200",0);
INSERT INTO departments(department_name,over_head_costs,total_sales) VALUES("Kawaii","100",0);