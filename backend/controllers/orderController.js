const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order= require("../models/orderModel");


exports.createOrder = catchAsyncError(async (req, res, next) => {
  
    const order = await Order.create(req.body);
  
    res.status(201).json({
      success: true,
      order,
    });
  });

  exports.getAllOrders = catchAsyncError(async (req, res) => {
    
    const orders = await Order.find();
setTimeout(() => {
  res.status(200).json({
    success: true,
    orders,
  });
}, 1000);
     
    });

    exports.getOrderDetail= catchAsyncError(async (req, res) => {
      const order= await Order.findById(req.params.id);
     
        if (!order) {
          return res.status(500).json({
            success: false,
            message: 'order not found',
          });
        }
    
  res.status(200).json({
    success: true,
    order,
  });
    
    
    });
    exports.updateOrderDetail= catchAsyncError(async (req, res) => {
      let order= await Order.findById(req.params.id);
      if (!order) {
              return res.status(500).json({
                success: false,
                message: 'order not found',
              });
            }
            order = await Order.findByIdAndUpdate(req.params.id, req.body, {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            });
      res.status(200).json({
        success: true,
        order,
      });
    });
    exports.deleteOrder = catchAsyncError(async (req, res) => {
    
      const order = await Order.findById(req.params.id);
     
        if (!order) {
          return res.status(500).json({
            success: false,
            message: "order not found",
          });
        }
    
      await order.remove();
      res.status(200).json({
        success: true,
        message: "deleted successfully",
      });
      });