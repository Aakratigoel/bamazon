var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Jul@1989",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showMenu();
  });
function showMenu()
{
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'menuOptions',
            choices: ['View Products Sales By Department', 'Create New Department']
        }
    ])
    .then(function (answers) {
        if (answers.menuOptions === "View Products Sales By Department") {
            connection.query("Select * from  products",
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    connection.end();
                                })
                            
            }
        })
}
