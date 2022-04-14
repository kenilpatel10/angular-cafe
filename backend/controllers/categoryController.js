const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Category= require("../models/categoryModel");


exports.createCategory = catchAsyncError(async (req, res, next) => {
  
    const category = await Category.create(req.body);
  
    res.status(201).json({
      success: true,
      category,
    });
  });
  

  
  exports.getAllCategory = catchAsyncError(async (req, res) => {
    
  const category = await Category.find();
  setTimeout(() => {
    res.status(200).json({
      success: true,
      category,
    
  
    });
  }, 1000);
   
 
  });

  exports.deleteCategory = catchAsyncError(async (req, res) => {
    
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(500).json({
        success: false,
        message: "table not found",
      });
    }
      await category.remove();
      res.status(200).json({
        success: true,
        message: "deleted successfully",
      });
    });