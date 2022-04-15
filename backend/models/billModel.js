const mongoose = require("mongoose");

//Order Details as well as payment details

const billSchema = new mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },
    customerName:{
      type: String, required: true 
    },
    phone:{
      type: Number, required: true
    },
    orderItems:[
      {
        item: { type: String, required: true },
        qty: { type: Number, required: true },
        category: { type: String, required: true },
        itemPrice: { type: Number, required: true },
        tableId:{ type: String, required: true },
        tableName:{ type: String, required: true },
      },
    ],
    paymentMethods: {
      type: String,
    default:"cash",
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
    //   required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdAt: {
      type: Date,
    },
   
  },

);

const Bill = mongoose.model("Bill", billSchema);

module.exports = Bill;