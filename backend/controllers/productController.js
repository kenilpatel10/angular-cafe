const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");


//create product---admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  // req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
    
  });
});


//get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  
  const resultPerPage = 6
  const productCount = await Product.countDocuments();
  // const apiFeature= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);

 const  products = await Product.find();
setTimeout(() => {
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,

  });
}, 1000);


});

//get all products FOR ADMIN
exports.getAdminProducts = catchAsyncError(async (req, res) => {
  
const products = await Product.find();

 
  res.status(200).json({
    success: true,
    products,
  

  });
});



//get product details
exports.getProductDetail= catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
          return res.status(500).json({
            success: false,
            message: "product not found",
          });
        }
  res.status(200).json({
    success: true,
    product,
  });
});

//update product --admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {

    return next(new ErrorHandler("product not found", 404))
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product

exports.deleteProduct = catchAsyncError( async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }

// for (let i = 0; i < product.images.length; i++) {
// await cloudinary.v2.uploader.destroy(product.images[1].public_id)
  
// }


  await product.remove();

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});

// product review (do it letter 3:48:39)

exports.getByCategoryProduct = catchAsyncError( async (req, res, next) => {
  const product = await Product.find(req.body.category);
  res.status(200).json({
    success: true,
    message: "successfully",
    product,
    
  });
console.log("cat", product)
});