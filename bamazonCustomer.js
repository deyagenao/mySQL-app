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
    startBamazon();
    // requestProductPurchase();
});

// function to start bamazon and show the available products 
function startBamazon() {

    console.log("\n\nWelcome to Bamazon! These are the items we currently have available for purchase: \n\n");

    showProducts();

}




// function for showing available products 
function showProducts(){

    connection.query("SELECT * FROM products", function(err, data){
        
        if (err) throw err;

        // for loop to print all of the item data to the console 
        for (var i=0; i < data.length; i++){
            console.log(data[i].item_id, "||", data[i].product_name, "||", data[i].department_name, "|| $" + data[i].price, "|| Quantity in Stock:", data[i].stock_quantity+ "\n");
        }

        makePurchase();

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
        // check if the product ID entered actually matches one that is available 
            connection.query("SELECT item_id, stock_quantity, price FROM products WHERE ?", 
            {
                item_id: answers.productId
            },
            function(err, data){
                if (err) throw err;
                var productExists = false;
                for (var i = 0; i < data.length; i++){
                    if (data[i].item_id == answers.productId){
                        productExists = true;
                        console.log("please work")
                        if (data[i].stock_quantity > parseInt(answers.productQuantity)){
                            console.log("Great! \n")
                            console.log("Your total will be: \n $" + calculatePrice(parseInt(answers.productQuantity), data[i].price) + "\nThank you for your purchase.");
                        }else{
                            console.log("Sorry, insufficient quantity available.")
                        }
                    }
                }
                if(productExists === false){
                    console.log("Please enter a valid product ID number.")
                }
                
                

                // console.log(data);
                // console.log(data.item_id);
                // if (thisProductId === answers.productId){
                //     if(data.stock_quantity < answers.productQuantity){
                //         console.log("Sorry, insufficient quantity!")
                //     }
                    
                // }else {
                //     console.log("Please enter a valid product ID number.")
                // }
                showProducts();
            })
    })
}

function calculatePrice(quant, price){
    return quant*price;
}
