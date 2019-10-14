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
    
    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err,data){
        
        if (err) throw err;

        for (var i = 0; i < data.length; i++){

            console.log(data[i].item_id, data[i].product_name, "|| Stock Quantity: ", data[i].stock_quantity)

        }

        inquirer.prompt([
            { 
                name: "productId",
                type: "input",
                message: "Please enter the item ID of the product you would like to add inventory to.",
                validate: function (value){
                    if (isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "addUnitsQuantity",
                type: "input",
                message: "How many units would you like to the inventory?",
                validate: function(value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answers){
            
            // check if the product ID entered matches a real product
            var productExists = false;

            for (var i = 0; i < data.length; i++){

                if (data[i].item_id === parseInt(answers.productId)){
                    // change the value of product exists 
                    productExists = true;

                    connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {stock_quantity: data[i].stock_quantity + parseInt(answers.addUnitsQuantity)},
                        {item_id: answers.productId}
                    ],
                    function(err){
                        if (err) throw err 
                        
                    })

                }
            }

            if (productExists === false) {
                console.log("Oops, that was not a valid product ID number. Please try again.")
                addToInventory();
            }else{
                console.log("\n\nProduct inventory updated!")
                // rerun the menu program
                viewMenu();
            }

        })
        
    })
};



// Add New Product: add a completely new product 
function addNewProduct(){

    inquirer.prompt([
        {
            name: "productName",
            type: "input",
            message: "What is the name of the product you would like to add to the inventory?",
        },
        {
            name: "departmentName",
            type: "input",
            message: "What department is this product in?"
        },
        {   name: "price",
            type: "input",
            message: "What is the price of this product?",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        },
        {
            name: "stockQuantity",
            type: "input",
            message: "How many units of this product would you like to add to stock?",
            validate: function(value){
                if(isNaN(value) === false){
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?", 
            {
                product_name: answer.productName,
                department_name: answer.departmentName,
                price: answer.price,
                stock_quantity: answer.stockQuantity
            },
            function(err){
                if (err) throw err; 

                console.log("\n\nProduct added to inventory!");

                // rerun the menu program
                viewMenu();
            })
    }) 
};
