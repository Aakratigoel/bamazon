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
    showProducts();
  });

  function showProducts()
  {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        userOrder();
        
    });
}
function userOrder()
{
    inquirer
    .prompt([
     {
      type:'input',
      name:'itemId',
      message:'Enter the id of the item you would like to buy?'
     },
     {
        type:'input',
        name:'quantity',
        message:'how many units of products would you like to buy?'
     }
    ])
    .then(function(answers) {
      
      connection.query("Select * from  products Where ?",
      {
          item_id:answers.itemId,
      },function(err,res)
      {
        if (err) throw err;
        var oldStockQuantity = res[0].stock_quantity;
        var productSale = res[0].product_sale;
        //Check if item is available
        var newStockQuantity =oldStockQuantity-answers.quantity;
        if(oldStockQuantity >= answers.quantity)
        {
           var totalCost= res[0].price*answers.quantity;
            connection.query("Update products SET ? WHERE ?",
            [{
                stock_quantity:newStockQuantity
            },
            {
                item_id: answers.itemId
            }],
            function(err,res)
            {
              if (err) throw err;
              //console.log(res.affectedRows + " products updated!\n");
              console.log("Total amount:"+"$"+totalCost);
              productSale= productSale + totalCost;
                connection.query("Update products SET ? WHERE ?",
                [
                  {
                    product_sale: productSale
                  },
                  {
                    item_id: answers.itemId
                  }
                ],
                function(err,res)
                {
                  if (err) throw err;
                  connection.end();
                  console.log("Item bought");
                })
            }
          );
        }
        else{
            console.log("Insufficient quantity!!")
        }
        
      })
     
    });
    
  }
 