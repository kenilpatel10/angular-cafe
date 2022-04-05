const express = require("express");
const router= express.Router();
const{createTable,getAllTable,getTable,deleteTable}= require("../controllers/tableController")


router.route("/admin/createTable").post(createTable);
router.route("/tables").get(getAllTable)
router.route("/table/:id").get(getTable);
router.route("/table/:id").delete(deleteTable);
module.exports= router;