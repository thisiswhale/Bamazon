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
});

//List evething in the list
var database = [];

var columnify = require('columnify');
connection.query("SELECT * FROM customer_db", function(err, data) {
	for(var i=0; i< data.length; i++){
		var row = {
			item_id: data[i].item_id,
			Product_Name: data[i].product_name,
			Category: data[i].department_name,
			Price: data[i].price,
			Stock_quantity: data[i].stock_quantity
		};
		database.push(row);
	}

    //console.log(data[0].price);
    //console.log(database);
    console.log("");
    console.log(columnify(database,{align: 'right', paddingChr: '.'}));
});


//insert connections
//List out the items