const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Table = require("../models/tableModel")


exports.createTable = catchAsyncError(async (req, res, next) => {
  
    const table = await Table.create(req.body);
  
    res.status(201).json({
      success: true,
      table,
    });
  });
  

 
  exports.getAllTable = catchAsyncError(async (req, res) => {
    
    const tables = await Table.find();
    
    setTimeout(() => {
      res.status(200).json({
        success: true,
        tables,
      
    
      });
     }, 1000);
    });
    exports.getTable= catchAsyncError(async (req, res) => {
        const table = await Table.findById(req.params.id);
        if (!table) {
                return res.status(500).json({
                  success: false,
                  message: "table not found",
                });
              }
        res.status(200).json({
          success: true,
          table,
        });
      });
      exports.deleteTable = catchAsyncError(async (req, res) => {
    
        const table = await Table.findById(req.params.id);
        if (!table) {
                return res.status(500).json({
                  success: false,
                  message: "table not found",
                });
              }
      await table.remove()
          res.status(200).json({
            success: true,
            message: "deleted successfully",
          
        
          });
        });