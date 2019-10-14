# Bamazon: A MySQL Node App
Bamazon is a command line interface application that runs using Node, Inquirer and MySQL databases. 

## Two Programs to Choose From
### Bamazon for Customers 
One of the Bamazon programs available is that for customers. To run the program, simply enter the following in your terminal:

`node bamazonCustomer.js`

Customers can view products available for sale and make purchases based on product availability all on the console. The Bamazon program automatically generates a product list and then prompts the user (using inquirer) to enter the product ID of the product they would like to purchase as well as the quantity of items they would like to buy. Purchases are then reflected in the MySQL database, as the product stock quantity will decrease accordingly. The program then gives the user the option to either make a new purchase or quit the program.

### Bamazon for Managers
For the manager view, users have multiple actions to choose from. To start the program, simply enter the following commands in your terminal:

`node bamazonManager.js`

Upon start, the program will prompt the user with a menu of actions. Users can view all available products in stock, or even view the products that specifically have low inventory as the program will make queries to the mySQL database, retreive the information and print it to the terminal. The program also allows user to add stock to the inventory and completely new programs by first prompting the user through inquirer and then using the user responses to make queries to the mySQL database and update/insert new values to the products table. 