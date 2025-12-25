const { getUserCart, addToCart, updateCart } = require("../controllers/cart.controller")
const authUser = require("../middleware/auth")

const cartRouter = require("express").Router()



cartRouter.post("/get", authUser ,getUserCart)
cartRouter.post("/add", authUser ,addToCart)
cartRouter.post("/update", authUser ,updateCart)


module.exports = cartRouter