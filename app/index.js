// Import express
let express = require('express');
// Import cors
const cors = require('cors');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Import Morgan
let morgan = require('morgan');
require('dotenv').config();
// Initialise the app
let app = express();
// use morgan to log at command line
app.use(morgan('combined'));
app.use(cors()) // config cors so that front-end can use
app.options( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
}, cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect(process.env.DB_CLOUD_URI, { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Set default API response
app.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Hello World with Express',
    });
});
// Import contact controller
let contactController = require('./routes/contact');
// Contact routes
app.route('/contacts')
    .get(contactController.getContacts)
    .post(contactController.postContact)
app.route('/contacts/:id')
    .get(contactController.getContact)
    .put(contactController.updateContact)
    .delete(contactController.deleteContact);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});

module.exports = app;