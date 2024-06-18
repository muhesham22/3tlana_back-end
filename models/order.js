const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product' },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    
  },
  total: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);
