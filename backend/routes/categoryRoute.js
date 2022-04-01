const express = require("express");
const router= express.Router();
const {createCategory, getAllCategory}= require("../controllers/categoryController");



router.route("/category").post(createCategory);
router.route("/categories").get(getAllCategory)

module.exports= router;