const mongoose = require("mongoose");
const cartitemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: { type: Number },
});
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  verification: { type: String },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    city: { type: String },
    street: { type: String },
    buildingNo: { type: Number },
    postalcode: { type: String },
  },
  car: {
    platenumber: { type: String },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
  },
  cart: [cartitemSchema],
});

module.exports = mongoose.model("User", userSchema);
