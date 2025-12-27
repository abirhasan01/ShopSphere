const { allOrders, updateStatus, placeOrder, placeOrderStrip, placeOrderRezorpay, userOrders, verifyStripe, verifyRazorpay } = require("../controllers/order.controller")
const adminAuth = require("../middleware/adminAuth")
const authUser = require("../middleware/auth")

const orderRouter = require("express").Router()

// Admin Features
orderRouter.post("/list", adminAuth ,allOrders)
orderRouter.post("/status", adminAuth ,updateStatus)

// Payment Features
orderRouter.post("/place", authUser ,placeOrder)
orderRouter.post("/stripe", authUser, placeOrderStrip);
orderRouter.post("/razorpay", authUser, placeOrderRezorpay);

// User Feature
orderRouter.post("/userorders", authUser, userOrders)

// verify payment
orderRouter.post("/verify-stripe", authUser, verifyStripe)
orderRouter.post("/verify-razorpay", authUser, verifyRazorpay)


module.exports = orderRouter