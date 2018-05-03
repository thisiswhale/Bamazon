# Bamazon

## Overview
Bamazon is a Amazon-like storefront using MySQL. The app takes orders from users and deplete stock from the store's inventory, track products saves across the store's departments, and provide a summary of department's sales record.

#### Built with
  - Node.js
  - mySQL
- - -

### `node bamazonCustomer.js`
1. Display sales inventory

![first image](images/customer1.jpg)

2. User can purchase the product by selecting itemID and enter the quantity user want to buy and updates sales inventory and asks for another transaction.

![second image](images/customer2.jpg)

3. If user place an order where the ran out of stocks, it will log 'Insufficiant quantity' and asks for another transaction.

![third image](images/customer3.jpg)

- - -

### `node bamazonManager.js`
- List a set of menu options:

  ![image](images/manager1.jpg)

  * View Products for Sale: List available items

  ![image](images/manager2.jpg)

  * View Low Inventory: Display items with stock count lower than 50

  ![image](images/manager3.jpg)

  * Add to Inventory: Stock more of any item in the store

  ![image](images/manager4.jpg)

  * Add New Product: Adds a new product to the store

  ![image](images/manager5.jpg)

- - -

### `node bamazonSupervisor.js`
- List of set menu options:

    ![image](images/supervisor1.jpg)

  * View Product Sales: Display the supervisor view where views departmentID, department_name, over_head_costs, total_sales, and total_profit.
  note: 'total_profit' is the difference of 'over_head_costs' and 'total_sales and is not stored in database. See Example below.

    ![image](images/supervisor2.jpg)

  * Create New Department: Adds a new item category.

    ![image](images/supervisor3.jpg)

- Example:

  * 'Suppa Sukka' item is purchased with quantity of 5. Total cost $75 which profits to the store from `bamazonCustomer.js`.

  ![image](images/example1.jpg)

  * The profit value is added into the supervisor table from `bamazonSupervisor.js` from -250 to -175.

  ![image](images/example2.jpg)
