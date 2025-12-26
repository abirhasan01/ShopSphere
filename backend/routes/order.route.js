const { allOrders, updateStatus, placeOrder, placeOrderStrip, placeOrderRezorpay, userOrders } = require("../controllers/order.controller")
const adminAuth = require("../middleware/adminAuth")
const authUser = require("../middleware/auth")

const orderRouter = require("express").Router()

// Admin Features
orderRouter.post("/list", adminAuth ,allOrders)
orderRouter.post("/status", adminAuth ,updateStatus)

// Payment Features
orderRouter.post("/place", authUser ,placeOrder)
orderRouter.post("/stripe", authUser, placeOrderStrip);
orderRouter.post("/rezorpay", authUser, placeOrderRezorpay);

// User Feature
orderRouter.post("/userorders", authUser, userOrders)


module.exports = orderRouter