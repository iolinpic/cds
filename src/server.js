const express = require('express');
require('./config/db');

const app = express();

// parse requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

// default route
require('./routes/product.js')(app);
require('./routes/user')(app);
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Crysmo-dialogs page"});
});

