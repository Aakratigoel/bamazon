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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayMenu();
});

function displayMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menuOptions',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product']
            }
        ])
        .then(function (answers) {
            if (answers.menuOptions === "View Products for Sale") {
                connection.query("Select * from  products",
                    function (err, res) {
                        if (err) throw err;
                        console.table(res);
                        connection.end();
                    })
            }
            else if (answers.menuOptions === "View Low Inventory") {
                connection.query("Select * from  products WHERE stock_quantity<5",
                    function (err, res) {
                        if (err) throw err;
                        if(res.length === 0)
                        {
                            console.log("Sufficient Quantity for all the products")
                        }
                        else{
                            console.table(res);
                        }
                       
                        connection.end();
                    })
            }
            else if (answers.menuOptions === "Add To Inventory") {

                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'itemIdToAdd',
                            message: 'Enter the id of the item you want to add more'
                        },
                        {
                            type: 'input',
                            name: 'quantity',
                            message: 'Enter the quantity of the item'
                        }
                    ])
                    .then(function (answers) {
                        connection.query("Select * from  products Where ?",
                            {
                                item_id: answers.itemIdToAdd,
                            }, function (err, res) {
                                if (err) throw err;
                                // console.table(res);
                                var oldQuantity = parseInt(res[0].stock_quantity);
                               // console.log(oldQuantity);
                                var newQuantiy = oldQuantity + parseInt(answers.quantity);
                                console.log("New Quantity:"+newQuantiy);
                                connection.query("Update products SET ? WHERE ?",
                                    [{
                                        stock_quantity: newQuantiy
                                    },
                                    {
                                        item_id: answers.itemIdToAdd
                                    }],
                                    function (err) {
                                        if (err) throw err;
                                        // console.log(res.rowsAffected);
                                        connection.end();
                                    })
                            })
                    });
            }
            else if (answers.menuOptions === "Add New Product") {
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'itemName',
                            message: 'Enter the name of the product you want to add'
                        },
                        {
                            type: 'input',
                            name: 'departmentName',
                            message: 'Enter the name of the department',
                        },
                        {
                            type: 'input',
                            name: 'itemPrice',
                            message: 'Enter the price of the product'
                        },
                        {
                            type: 'input',
                            name: 'itemQuantity',
                            message: 'Enter the  quantity of the product'
                        }
                    ])
                    .then(function (answers) {
                        connection.query(
                            "Insert into products SET?",
                            {
                                    product_name:answers.itemName,
                                    department_name:answers.departmentName,
                                    price:answers.itemPrice,
                                    stock_quantity:answers.itemQuantity
                            },
                            function (err) {
                                if (err) throw err;
                                connection.end();
                                //console.log(res.affectedRows + " products updated!\n");
                               console.log("New product inserted");
                            }
                        );  
                         
            })
}
        });
}