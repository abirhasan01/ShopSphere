const orderModel = require("../model/order.model")
const userModel = require("../model/user.model")


// --------------- placeing orders using COD method
const placeOrder = async (req, res) => {
    try {
        
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({
            success: true,
            message: "Order Placed"
        })


    } catch (error) {
        console.log(error)
        res.json({
          success: false,
          message: error.message,
        });
    }
}



// --------------- placeing orders using Stripe method
const placeOrderStrip = async (req, res) => {

}

// --------------- placeing orders using Rezorpay method
const placeOrderRezorpay = async (req, res) => {

}

// --------------- All orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})

        res.json({
            success: true,
            orders
        })
        
    } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });
    }
}

// --------------- userOrder Data For Frontend
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })

        res.json({
            success: true,
            orders
        })
        
    } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });
    }
    
}

// --------------- update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({
            success: true,
            message: "Status Updated"
        })

    } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        });
    }
};


module.exports = {
    placeOrder,
    placeOrderStrip,
    placeOrderRezorpay,
    allOrders,
    userOrders,
    updateStatus
}