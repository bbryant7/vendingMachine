const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/vendingdb');
const express = require('express');
const bodyParser = require('body-parser');
const vendingMachine = require('./models/inventory.js');
const ObjectId = require('mongodb').ObjectID;
const app = express();


app.use(bodyParser.json())

// get list of vending machine inventory
app.get('/',function(req, res){
  vendingMachine.find().then(function(results){
    res.json({inventory: results})
  })
})

// add new item to vending machine
app.post("/", function(req, res) {


  const newItem = new vendingMachine({
    description: req.body.description,
    cost: req.body.cost,
    quantity: req.body.quantity,

  })

  newItem.save().then(function(){
    res.json({status: "success"})
  })
});

//Purchase item (update item quantity to 1 less)
app.post("/api/customer/items/:id/purchases", function(req, res) {
  console.log("hey boothang")
  vendingMachine.findOneAndUpdate({_id:req.params.id},{$set: {description: req.body.description,
  cost: req.body.cost,
  quantity: req.body.quantity,}})
  .then(function(results){
    res.json({status: "success"})
  })
  console.log("hey boothang")
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
