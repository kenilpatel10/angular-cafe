const express = require("express");
const router= express.Router();
const{createTable,getAllTable,getTable}= require("../controllers/tableController")


router.route("/create").post(createTable);
router.route("/tables").get(getAllTable)
router.route("/table/:id").get(getTable);
module.exports= router;