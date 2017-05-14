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
        // for(var i=0; i< data.length; i++){
        // 	var row = {
        // 		item_id: data[i].item_id,
        // 		Product_Name: data[i].product_name,
        // 		Category: data[i].department_name,
        // 		Price: data[i].price,
        // 		Stock_quantity: data[i].stock_quantity
        // 	};
        // 	database.push(row);
        // }
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

            //must parse to Int from string data
            var thisItemsStocks_pars = parseInt(data[user.itemIndexChosen - 1].stock_quantity);
            var thisItemsPrice_pars = parseInt(data[user.itemIndexChosen - 1].price);
            var quantityAmt_pars = parseInt(user.quantityAmt);

            //If theres still in stock, then update database
            if (thisItemsStocks_pars >= quantityAmt_pars) {
                connection.query("UPDATE customer_db SET stock_quantity=? WHERE item_id=?", [(thisItemsStocks_pars - quantityAmt_pars), user.itemIndexChosen], function(err, res) {
                    if (err) throw err;
                    console.log(data[user.itemIndexChosen - 1].product_name + " : $" + thisItemsPrice_pars)
                    console.log("Quantity: " + quantityAmt_pars)
                    console.log("Total: $" + (thisItemsPrice_pars * quantityAmt_pars))
                    console.log("... ... ...Transaction recieved.");
                    printDB();
                })
            } else {
                console.log("Insufficient Quantity");
                console.log("");
                makePurchase();
            }
        });
    });
}


/*columns:
item_id , product_name, department_name, price, stock_quantity
*/
