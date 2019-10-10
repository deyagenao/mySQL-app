// require mySQL and inquirer packages 
var mySQL = require("mysql");
var inquirer = require("inquirer");



// create a connection to access information in the SQL database
var connection = mySQL.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "AnotherPassword",

    database: "bamazon_db"
});



// function to connect to mysql server and sql database 
connection.connect(function(err) {
    if (err) throw err;

    // function to begin the bamazon program
    showProducts();
    
});



// function for showing available products 
function showProducts(){
    console.log("\n\nWelcome to Bamazon! These are the items we currently have available for purchase: \n\n");

    connection.query("SELECT * FROM products", function(err, data){
        
        if (err) throw err;

        // for loop to print all of the item data to the console 
        for (var i=0; i < data.length; i++){
            console.log(data[i].item_id, data[i].product_name, "||", data[i].department_name, "|| $" + data[i].price.toFixed(2), "|| Quantity in Stock:", data[i].stock_quantity+ "\n");
        }

        // prompt the user to see if they would like to run the program or exit 
        inquirer.prompt({
            name: "userAction",
            type: "rawlist",
            message: "What would you like to do now?",
            choices: ["Make a purchase.", "Exit Bamazon."]
        }).then(function(answer){
            if(answer.userAction === "Make a purchase."){
                makePurchase();
            }else{
                process.exit();
            }
        })
    });

}



// function to prompt user if they would like to make a purchase
function makePurchase(){
    // ask the user which product they would like to buy and the number of units they would like to purchase
    inquirer.prompt([
        {
            name: "productId",
            type: "input",
            message: "Which product would you like to purchase? (Please enter the product ID number.)",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "productQuantity",
            type: "input",
            message: "How many units of this product would you like to purchase?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answers){

            // begin query to the bamazon database 
            connection.query("SELECT item_id, stock_quantity, price FROM products WHERE ?", 
            {
                item_id: answers.productId
            },
            function(err, data){
                if (err) throw err;

                // check if the product ID entered actually matches one that is available 
                var productExists = false;

                // loop through the result
                for (var i = 0; i < data.length; i++){

                    // if the product exists
                    if (data[i].item_id == answers.productId){
                        // change the value of productExists to true 
                        productExists = true;

                        // check if there is sufficient quantity to make the purchase 
                        if (data[i].stock_quantity >= parseInt(answers.productQuantity)){
                            
                            // if true, return the price to the user 
                            console.log("Great! \nYour total will be: \n $" + calculatePrice(parseInt(answers.productQuantity), data[i].price) + "\nThank you for your purchase.");

                            // update product quantity in the database to reflect the purchase 
                            connection.query("UPDATE products SET ? WHERE ?", 
                            [
                                {stock_quantity: data[i].stock_quantity - answers.productQuantity},

                                {item_id: answers.productId}
                            ], 
                            function (err) {
                                if (err) throw err;
                            }
                            )

                        }else{
                            // return message to user if there is an insufficient quantity of the product available 
                            console.log("Sorry, insufficient quantity available.")
                        }
                    }
                }

                // if the product does not exist, tell the user 
                if(productExists === false){
                    console.log("Oops, please enter a valid product ID number.")
                }
                
                // run the showProducts function to begin the program again
                showProducts();
            })
    })
}


// function for returning the price of purchases made 

function calculatePrice(quant, price){
    return (quant*price).toFixed(2);
}
