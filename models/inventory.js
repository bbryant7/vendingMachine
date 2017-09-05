
const mongoose = require('mongoose');

const vendingMachine = new mongoose.Schema({
        description: {type: String, required: true, unique: true},
        cost: {type: Number, required: true},
        quantity: {type: Number, required: true}
      
})

const inventory = mongoose.model('inventory', vendingMachine);

module.exports = inventory;
