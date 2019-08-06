const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.js');

mongoose.Promise = global.Promise;
const app = express();

// parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//routes
require('./src/routes/product.routes.js')(app);
//connect db
mongoose.connect(config.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the database");
    // start server
    app.listen(config.serverport, () => {
        console.log(`Server is listening on port ${config.serverport}`);
    });
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Crysmo-dialogs page"});
});

