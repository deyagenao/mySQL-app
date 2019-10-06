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
});

// function to start bamazon and show the available products 
function startBamazon() {
    console.log("Welcome to Bamazon! These are the items we currently have available for purchase: ");
    showProducts();
}

// function for showing available products 
function showProducts(){
    connection.query("SELECT * FROM products", function(err, data){
        if (err) throw err;
        for (var i=0; i < data.length; i++){
            console.log(data[i].item_id, "||", data[i].product_name, "||", data[i].department_name, "|| $" + data[i].price, "|| Quantity in Stock:", data[i].stock_quantity+ "\n");
        }
    });
}

// inquirer.prompt({

// }).then(function(answer){

// })