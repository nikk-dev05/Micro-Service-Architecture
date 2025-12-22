const express = require("express");
const router = express.Router();
const orderService = require("../services/order.service");

router.post("/create", orderService.createOrder);
router.get("/getMy", orderService.getMyOrders);
router.get("/get/:id", orderService.getOrderById);

module.exports = router;
