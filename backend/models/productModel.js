const mongoose = require("mongoose");

const productSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxlength: [7],
  },
  status:{
type:Boolean,
default:true
  },
  quantity:{
    type:Number,
    default:1
  },
  category: {
    type: String,
    required: [true, "please enter category"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    // required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
