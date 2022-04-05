const express = require("express");
const router= express.Router();
const {createCategory, getAllCategory,deleteCategory}= require("../controllers/categoryController");

router.route("/category").post(createCategory);
router.route("/categories").get(getAllCategory);
router.route("/category/:id").delete(deleteCategory);
module.exports= router;