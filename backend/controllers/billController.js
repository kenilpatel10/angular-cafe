const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Bill= require("../models/billModel");


exports.createBill = catchAsyncError(async (req, res, next) => {
  
    const bill = await Bill.create(req.body);
  
    res.status(201).json({
      success: true,
      bill,
    });
  });

  exports.getAllBills = catchAsyncError(async (req, res) => {
    
    const bill = await Bill.find();
setTimeout(() => {
  res.status(200).json({
    success: true,
    bill,
  

  });
}, 1000);
     
    });

    exports.getBillDetail= catchAsyncError(async (req, res) => {
      const bill= await Bill.findById(req.params.id);
     
        if (!bill) {
          return res.status(500).json({
            success: false,
            message: 'bill not found',
          });
        }
    
  res.status(200).json({
    success: true,
    bill,
  });
    
    
    });
    exports.updateBillDetail= catchAsyncError(async (req, res) => {
      let bill= await Bill.findById(req.params.id);
      if (!bill) {
              return res.status(500).json({
                success: false,
                message: 'bill not found',
              });
            }
            bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
              new: true,
              runValidators: true,
              useFindAndModify: false,
            });
      res.status(200).json({
        success: true,
        bill,
      });
    });
    exports.deleteBill = catchAsyncError(async (req, res) => {
    
      const bill = await Bill.findById(req.params.id);
     
        if (!bill) {
          return res.status(500).json({
            success: false,
            message: "bill not found",
          });
        }
    
      await bill.remove();
      res.status(200).json({
        success: true,
        message: "deleted successfully",
      });
      });