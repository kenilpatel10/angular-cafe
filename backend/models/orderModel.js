const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  item: { type: String, required: true },
  qty: { type: Number, required: true },
  category: { type: String, required: true },
  itemPrice: { type: Number, required: true },
  tableId: { type: String, required: true },
  tableName: { type: String, required: true },
  addOns: { type: String },
  createdAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
