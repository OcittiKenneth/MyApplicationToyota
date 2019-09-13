// Using middlewares and node modules in the project

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const mysql = require("mysql");
const path = require("path");
const app = express();


app.use(morgan('short'));

// a convenient variable to refer to the html directory
app.use(express.static('./toyota'));

// express using session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// using bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));

var html_dir = './toyota/'; //main folder name

// creating connection to the database 
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "mydatabase",
    password: "mysql"


});

//handling post request request for the form with action toyota
app.post("/toyota", (req, res) => {

    // Accessing html elements by their names
    const customer_id = req.body.customerId;
    const nameInput = req.body.name;
    const state = req.body.state;
    const shipping = req.body.shippingMethod;
    const partNumber = req.body.number;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const oversize = req.body.oversize;

    // seting variable querystring for inserting data in their respective rows in the database
    const querystring = 'INSERT INTO mytable(customer_id, name, state, shipping, part_number, price, quantity, oversize) VALUES(?,?,?,?,?,?,?,?)';

    // connecting our database to the form inputs
    connection.query(querystring, [customer_id, nameInput, state, shipping, partNumber, price, quantity, oversize]);
    connection.end(); // ending connection
    res.redirect("/"); //redirecting form after data submission
    res.end(); //ending request

});


// route to serve index page
app.get('/index', (req, res) => {
    res.sendfile(path.join(html_dir + 'index.html'));
});



// port for handling request
app.listen(3000);
console.log("listening at port 3000");