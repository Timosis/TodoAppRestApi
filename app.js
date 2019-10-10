const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header( 'Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH');

   next();
});

//IMPORT ROUTES
const postsRoute = require('./routes/posts');
const doingsRoute = require('./routes/doings');
const donesRoute = require('./routes/dones');

app.use('/posts',postsRoute);
app.use('/doings',doingsRoute);
app.use('/dones',donesRoute);


// SET UP DEFAULT MONGOOSE CONNECTION
var mongoDB = 'mongodb+srv://timosis:1234qqqQ@todoapicluster-gdbis.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB,{ useNewUrlParser: true, useCreateIndex:true });

// GET THE DEFAULT CONNECTION
var db = mongoose.connection;

// BIND CONNECTION TO ERROR EVENT (TO GET NOTIFICATION OF CONNECTION ERRORS)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
   console.log('MongoDB connection is successful. Connection is opened.')
});
app.listen(3000);