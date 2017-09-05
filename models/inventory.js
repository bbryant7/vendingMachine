
const mongoose = require('mongoose');

const vendingMachine = new mongoose.Schema({
    // "status": "success",
    "data": [{
        id: {type: Number, required: true, unique:true},
        description: {type: String, required: true},
        cost: {type: Number, required: true},
        quantity: {type: Number, required: true}
      }]
})

const inventory = mongoose.model('inventories', vendingMachine);

module.exports = inventory;
