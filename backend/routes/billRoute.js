const express = require("express");
const { createBill, getBillDetail, updateBillDetail, getAllBills, deleteBill } = require("../controllers/billController");
const router= express.Router();

router.route("/createBill").post(createBill);
router.route("/admin/bill/:id").put(updateBillDetail);
router.route("/admin/bill/:id").get(getBillDetail);
router.route("/admin/bill").get(getAllBills);
router.route("/admin/bill/:id").delete(deleteBill);

module.exports= router;