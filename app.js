const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vendingdb');
const express = require('express');
const bodyParser = require('body-parser');
const vendingMachine = require('./models/inventory.js');
const app = express();

app.use(bodyParser.json())


app.get('/api/customer/items',function(req, res){
  vendingMachine.find().then(function(results){
    res.json({inventory: results})
  })
})

app.post("/api/vendor/items", function(req, res) {


  const newItem = new vendingMachine({
    description: req.body.description,
    cost: req.body.cost,
    quantity: req.body.quantity,
  })

  newItem.save().then(function(){
    res.json({status: "success"})
  })
});



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
