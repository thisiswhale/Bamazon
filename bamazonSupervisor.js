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
var inquirer = require('inquirer');

function startPrompt() {
    inquirer.prompt([{
        type: "list",
        message: "Select a command:",
        choices: ["View Product Sales by Department", "Create New Department"],
        name: "command"
    }]).then(function(user) {
        if (user.command === "View Product Sales by Department") {
            printDB();
        } else {
            addDepartment();
        }
    });
}
//Need to add alias for total profit
function printDB() {
    var columnify = require('columnify');
    connection.query("SELECT *, total_sales - over_head_costs AS total_profit FROM departments", function(err, data) {
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
        startPrompt();
    });
}

function addDepartment() {
    inquirer.prompt([{
        message: "Add Department name: ",
        name: "addDepartment"
    }, {
        message: "Enter overhead cost: ",
        name: "overheadCost"
    }]).then(function(user) {
        connection.query("INSERT INTO departments SET ?",{
            department_name: user.addDepartment,
            over_head_costs: user.overheadCost,
            total_sales: 0
        },function(err,res){
            console.log("New department added.")
            startPrompt();
        });

    });
}
