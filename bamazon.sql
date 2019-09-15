DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name , department_name,price,stock_quantity)
 VALUES("TV","Electronics","999","100"),("iphone","Electronics","777","120"),
 ("Nike_Shoes","ClothingAndAccessories","100","150"),("Floor_Lamp","Electronics","50","70"),
 ("CoffeeTable","Furniture","300","50"),("Armrest","Furniture","250","80"),
 ("Levis_Jeans","ClothingAndAccessories","35","300"),("Wine","FoodAndDrinks","40","200"),
 ("Potato_Chips","FoodAndDrinks","5","200"),("Macbook","Electronics","999","200");
 CREATE TABLE departments(
   department_id INT NOT NULL AUTO_INCREMENT,
   department_name VARCHAR(45) NULL,
   over_head_costs DECIMAL(10,2) NULL,
   PRIMARY KEY(department_id)
 );
 INSERT INTO departments(department_name,over_head_costs)VALUES("Electronics","1000");
 INSERT INTO departments(department_name,over_head_costs)VALUES("ClothingAndAccessories","500");
 INSERT INTO departments(department_name,over_head_costs)VALUES("Furniture","1000");
 INSERT INTO departments(department_name,over_head_costs)VALUES("FoodAndDrinks","200");