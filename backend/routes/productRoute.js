const express = require("express");
const { getAllProducts, updateProduct,createProduct, deleteProduct, getProductDetail, getAdminProducts, getByCategoryProduct } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();


router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"),getAdminProducts);
router.route("/cat/product").get(getByCategoryProduct);
router.route("/admin/product/new").post(createProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/:id").delete(deleteProduct);
router.route("/product/:id").get(getProductDetail);


module.exports=router;