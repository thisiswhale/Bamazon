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
    printDB();
    makePurchase();
});

//List evething in the list
// var database = [];
function printDB() {
    var columnify = require('columnify');
    connection.query("SELECT * FROM customer_db", function(err, data) {
        // console.log("");
        // console.log(columnify(database,{align: 'right', paddingChr: '.'}));
        //console.log(data[0].price);
        //console.log(database);
        if (data.length == 0) {
            return console.log("Database not found.");
        } else {
            console.log("");
            console.log(columnify(data, { align: 'right', paddingChr: '.' }));
            console.log("");
        }
    });
}
var inquirer = require('inquirer');

function makePurchase() {
    connection.query("SELECT * FROM customer_db", function(err, data) {

        inquirer.prompt([{

            message: "Pick itemID to buy: ",
            name: "itemIndexChosen"
        }, {
            message: "Select quantity: ",
            name: "quantityAmt"
        }]).then(function(user) {

            //CHECK Empty user BUG
            if (user.itemIndexChosen === "" || user.quantityAmt === "") {
                console.log("Search Unknown.");
                return makePurchase();
            } 
            //Make TRANSACTION METHOD
            else {
                //must parse to Int from string data
                var thisItemsStocks_pars = parseInt(data[user.itemIndexChosen - 1].stock_quantity);
                var thisItemsPrice_pars = parseInt(data[user.itemIndexChosen - 1].price);
                var quantityAmt_pars = parseInt(user.quantityAmt);

                //If theres still in stock, then update database
                if (thisItemsStocks_pars >= quantityAmt_pars) {
                    connection.query("UPDATE customer_db SET stock_quantity=? WHERE item_id=?", [(thisItemsStocks_pars - quantityAmt_pars), user.itemIndexChosen], function(err, res) {
                        if (err) throw err;
                        var totalCost = thisItemsPrice_pars * quantityAmt_pars;
                        console.log(data[user.itemIndexChosen - 1].product_name + " : $" + thisItemsPrice_pars)
                        console.log("Quantity: " + quantityAmt_pars);
                        console.log("Total: $" + totalCost);
                        console.log("... ... ...Transaction recieved.");
                        //recored purchase into revenue table
                        logRevenue(totalCost, data[user.itemIndexChosen - 1].department_name);
                        printDB();
                        makePurchase();
                    })
                } else {
                    console.log("Insufficient Quantity");
                    console.log("");
                    makePurchase();
                }
            }

        });
    });
}

//revenue is INT, category is STR
function logRevenue(revenue, category) {
    connection.query("SELECT * FROM departments WHERE department_name=?", [category], function(err, data) {
        connection.query("UPDATE departments SET? WHERE?", [{
            total_sales: parseInt(data[0].total_sales) + revenue
        }, {
            department_name: category
        }], function(err, res) {
            console.log(res);
            console.log("Revenue sucess");
        });
    });
}

/*columns:
item_id , product_name, department_name, price, stock_quantity
*/
