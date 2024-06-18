const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
  type: { type: String, enum: ['products', 'service'] },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: { type: Number }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'

  },
  total: {
    type: Number
  },
  address: {
    type: String
  }
});

module.exports = mongoose.model('Order', orderSchema);
