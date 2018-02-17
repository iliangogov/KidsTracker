const express = require('express'),
    app = express(),
    dbConfig = require('./server/config/database'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    passport = require('passport'),
    morgan = require('morgan'),
    path = require('path'),
    cors = require('cors');

app.use(express.static(__dirname + '/dist'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//console logger
app.use(morgan('dev'))

// override Mongoose Promise
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(dbConfig.connectionString)

//initialize db collections
require('./server/data/models')(mongoose)

//initialize and configure passport authentication
app.use(passport.initialize())
require('./server/config/passport')(passport, dbConfig)

//enable api routes
let userController = require('./server/data/controllers/userController')

app.route('/api/user-details/:id').get(userController.getUserById)
app.route('/api/add-user').post(userController.registerNewUser)
app.route('/api/update-user').put(userController.updateUser)
app.route('/api/login').post(userController.tryAuthenticate)

// Retreive Angular build 
app.get('/*', function (req, res) {
    res.status(200)
        .sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port)

// Dev log
console.log('Server is running at: http://localhost:' + port);