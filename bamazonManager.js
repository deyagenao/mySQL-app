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



// Function to connect to mySQL database and begin the bamazon manager program 
connection.connect(function(err){
    if (err) throw err;

    // begin the program by displaying the menu to the user 
    viewMenu();
})



// View Menu function with the following options: View Products for Sale, View Low Inventory, Add to Inventory, Add New Product
function viewMenu(){
    console.log("\n\n------------------------------------------------------------------------\n\n");
    inquirer.prompt({
        name: "managerAction",
        type: "rawlist",
        message: "\nWelcome to Bamazon - Managers! \n\n What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit Bamazon - Managers"
        ]
    }).then(function(answer){
        if(answer.managerAction === "View Products for Sale"){
            viewProducts();
        }else if(answer.managerAction === "View Low Inventory"){
            viewLowInventory();
        }else if(answer.managerAction === "Add to Inventory"){
            addToInventory();
        }else if(answer.managerAction === "Add New Product"){
            addNewProduct();
        }else{
            process.exit();
        }
    })
};





// Functions linked to each manager program option
// ====================================================================================


// View Products for Sale: list every item available (item IDs, names, prices, quantities )
function viewProducts(){
    


    connection.query("SELECT * FROM products", function(err, data){
        if (err) throw err;
        console.log("\n\nHere are the products currently on sale: \n");
        for (var i=0; i < data.length; i++){
            console.log(data[i].item_id, data[i].product_name, "||", data[i].department_name, "|| $" + data[i].price.toFixed(2), "|| Quantity in Stock:", data[i].stock_quantity+ "\n");
        }

        // rerun the menu program
        viewMenu(); 
    })

};



// View Low Inventory: view all items where inventory count is lower than five 
function viewLowInventory(){
    
    connection.query("SELECT item_id, product_name, department_name, stock_quantity FROM products WHERE stock_quantity < 5", function(err, data){
        if (err) throw err;

        if (data.length > 0){

            console.log("\n\nHere are the products that currently have a low inventory.\n\n")

            for (var i = 0; i < data.length; i++){

                console.log(data[i].item_id, data[i].product_name, "||", data[i].department_name, 
                "||", data[i].stock_quantity)
    
            }
        }else{
            console.log("\nThere are currently no products with a low inventory.")
        }
        
        
        // rerun the menu program
        viewMenu();

    })
};



// Add to Inventory: add to inventory, add to the stock quantity 
function addToInventory(){

    // rerun the menu program
    viewMenu();
};



// Add New Product: add a completely new product 
function addNewProduct(){

    inquirer.prompt({

    }).then(function(answer){

    }) 

    // rerun the menu program
    viewMenu();
};
