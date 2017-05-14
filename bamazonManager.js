//Initialize connection with mysql
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "poke2511",
    database: "Bamazon"
});
//log for sucess
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt();

});

//Initialize inquirer
var inquirer = require('inquirer');

function startPrompt() {
    inquirer.prompt([{
        type: "list",
        message: "Select a command:",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: "command"
    }]).then(function(user) {

        switch (user.command) {
            case "View Products for Sale":
                printDB();
                break;

            case "View Low Inventory":
                printLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;
        }

    });

}
/*columns:
item_id , product_name, department_name, price, stock_quantity
*/
var columnify = require('columnify');

function printDB() {
    connection.query("SELECT * FROM customer_db", function(err, data) {
        console.log("");
        console.log(columnify(data, { align: 'right', paddingChr: '.' }));
        console.log("");

    });
    startPrompt();
    console.log("");
}

function printLowInventory() {
    var query = "SELECT * FROM customer_db HAVING stock_quantity <= 50";
    connection.query(query, function(err, data) {
        console.log("");
        console.log(columnify(data, { align: 'right', paddingChr: '.' }));
        console.log("");
    });
    startPrompt();
    console.log("");
}

function addInventory() {
    //ask for product search
    inquirer.prompt([{
        message: "Enter product name:",
        name: "productDBSearch"
    }]).then(function(user) {

        var selectorQuery = "'%" + user.productDBSearch + "%'";
        console.log(selectorQuery);
        connection.query("SELECT * FROM customer_db WHERE product_name LIKE" + selectorQuery, function(err, data) {
            //CHECKS FOR EMPTY DATA, ELSE do stuff
            if (data.length === 0 || data.length === undefined) {
                return console.log("Search not found!");
            } else {
                var viewItems = [];
                for (var i = 0; i < data.length; i++) {
                    viewItems.push(data[i].product_name);
                }
                //then choose item from search query and enter number for item
                inquirer.prompt([{
                    type: "list",
                    message: "Select item:",
                    choices: viewItems,
                    name: "select"
                }, {
                    message: "Enter inventory amount to add: ",
                    name: "addStocks"
                }]).then(function(user) {
                    connection.query("SELECT * FROM customer_db WHERE product_name=?", [user.select], function(err, data) {

                        var newStockQuantity = parseInt(user.addStocks) + parseInt(data[0].stock_quantity);
                        connection.query("UPDATE customer_db SET stock_quantity=? WHERE product_name=?", [newStockQuantity, user.select], function(err, res) {
                            console.log("Inventory updated");
                            startPrompt();
                            console.log("");
                        });
                    });

                });
            }
        });
    });
}

function addProduct() {
    console.log("hello");
    inquirer.prompt([{
        message: "Name the product: ",
        name: "product"
    }, {
        message: "Enter department: ",
        name: "department"
    }, {
        message: "Enter price: ",
        name: "price"
    }, {
        message: "Enter stocks: ",
        name: "stocks"
    }]).then(function(user) {

        connection.query("INSERT INTO customer_db SET?", {
            product_name: user.product,
            department_name: user.department,
            price: user.price,
            stock_quantity: user.stocks
        }, function(err, data) {
            console.log("");
            console.log("Database updated.");
            console.log("");
            startPrompt();
            console.log("");
        });
    });
}
