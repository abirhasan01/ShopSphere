require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
const connectCloudinary = require("./config/cloudinary");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

// ------------middleware & app config------------
connectDB()
connectCloudinary()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// -----------api endpoints-----------
app.get("/", (req, res) => {
    res.send("API Working")
})

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
})