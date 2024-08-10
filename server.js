const express = require('express')
var app = new express();  
const cors = require('cors')

require("dotenv").config();
var port = process.env.PORT || 4002;
var router = express.Router();

app.use(express.json())
app.use(cors())

let db = require('./models');

// db.sequelize.sync();
// db.sequelize.sync({ 
//     alter: true,
//     // logging: true 
// });

require('./routes/userRoutes')(app, router);
require('./routes/rewardHistoryRoutes')(app, router);
db.sequelize.authenticate()
.then(function (result) {
    app.listen(port, function (err) {
        if (typeof (err) == 'undefined') {
            console.log('Your application is running on : ' + port + ' port');
        } else {
            console.log('Your application is not running Try with another port!!!!');
        }
    });
})
.catch(function (err) {
    console.log("DatabaseError", err);
});