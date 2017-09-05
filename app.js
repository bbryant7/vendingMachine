const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vendingdb');
const express = require('express');
const vendingMachine = require('./models/inventory');
const app = express();









app.listen(3000, function() {
  console.log('Successfully started express application!');
})


process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
