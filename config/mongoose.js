const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ToDo');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connectiong to database '));

db.once('open' , function(){
    console.log("sucessfully connected to database");
}
);