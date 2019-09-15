# bamazon

#Customer_View

Application will first display all of the items available for sale.

The app  prompts users with two messages in order to help them place an order .

The first message asks them the ID of the product they would like to buy.
The second message asks how many units of the product they would like to buy.

Once the customer has placed the order, appilication checks if the store has enough of the product to meet the customer's request.

If not, the app logs a phrase  "Insufficient quantity!", and then prevent the order from going through.

However, if the store does have enough of the product, customer's order is fulfilled and customer is shown the total cost of their purchase.

 And the app updates the SQL database to reflect the remaining quantity.
 
 #Manager_View
 
 Applications lists a set of menu options:
 
1 View Products for Sale
2 View Low Inventory
3 Add to Inventory
4 Add New Product

->If a manager selects View Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.

->If a manager selects View Low Inventory, then app lists all items with an inventory count lower than five.

->If a manager selects Add to Inventory, app  displays a prompt that will let the manager "add more" of any item currently in the store and it takes the all the details of the item to be added (loke : id and quantity).

->If a manager selects Add New Product, app allows the manager to add a completely new product to the store and asks manager for the details of the item(like : name, departmentName, price and quantity).

Links of the videos :
https://github.com/Aakratigoel/bamazon/tree/master/videos
