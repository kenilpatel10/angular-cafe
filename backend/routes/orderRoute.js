const express = require("express");
const { getOrderDetail,createOrder , getAllOrders, deleteOrder, updateOrderDetail, deleteAllOrder } = require("../controllers/orderController");

const router= express.Router();

router.route("/createorder").post(createOrder);
router.route("/admin/order/:id").put(updateOrderDetail);
router.route("/admin/order/:id").get(getOrderDetail);
router.route("/admin/orders").get(getAllOrders);
router.route("/admin/order/:id").delete(deleteOrder);
router.route("/admin/orders/:id").delete(deleteAllOrder);
module.exports= router;