// require npm packages
var mySQL = require("mysql");
var inquirer = require("inquirer");

//create connection to mySQL database
var connection = mySQL.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "AnotherPassword",
    database: "bamazon_db"
});


// Menu Options: 
// View Products for Sale
// View Low Inventory 
// Add to Inventory 
// Add New Product



// View Products for Sale: list every item available (item IDs, names, prices, quantities )
// View Low Inventory: view all items where inventory count is lower than five 
// Add to Inventory: add to inventory, add to the stock quantity 
// Add New Product: add a completely new product 
