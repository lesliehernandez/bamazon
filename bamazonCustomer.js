const mysql = require("mysql")
inquirer = require("inquirer")
consoleTable = require("console.table");

connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
})


connection.connect(function(err) {
    if (err) {
        console.error('Connection Failed');
        throw err;
    }
    console.log("connected as id " + connection.threadId)
})


var displayProducts = function () {
	var products = [];
	connection.query('SELECT * FROM bamazon.products', function(err, res) {
	    var itemsArray = [];
	    for (var i = 0; i < res.length; i++) {
	        itemsArray.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
	 	}
	 	products.push(itemsArray);
	 	for (var i = 0; i < products.length; i++) {
	 		console.table(['Item ID', 'Product Name', 'Department' ,'Price', 'Stock Quantity'], products[i])
	 	}
	})
}

var addCart = function() {
    connection.query('SELECT * FROM bamazon.products', function(res) {
        inquirer.prompt([{
            name: "item",
            type: "input",
            message: "Enter the Item ID for the product you'd like to buy.",
            validate: function(value) {
		        if (isNaN(value) == false) {
		            return true;
		        } else {
		            return "Invalid number. Please try again.";
		        }
	  		}
	  		
	  	}, {
	  		name: "quantity",
	  		type: "input",
	  		message: "How many would you like?",
            validate: function(value) {
		        if (isNaN(value) == false) {  
		            return true;
		        } else {
		            return "Invalid number. Please try again.";
		        }
              }

	  	}]).then(function (answers) {
	  		connection.query("SELECT * FROM bamazon.products WHERE ?", {item_id: parseInt(answers.item)}, function(err, res){
	  			var stock_left = ((res[0].stock_quantity) - (answers.quantity))
	  			if  (stock_left > 0){ 
	  				connection.query("UPDATE bamazon.products SET ? WHERE ?", [{stock_quantity: parseInt(stock_left)}, {item_id: parseInt(answers.item)}])
	  				console.log("Added to cart! Your total is " + (answers.quantity) * (res[0].price))
	  			} else {
	  				console.log("Insufficient quantity!")
	  			}
	  		})
  			
		})
	})
};

displayProducts();
addCart();