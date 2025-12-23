require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
const connectCloudinary = require("./config/cloudinary");
const userRouter = require("./routes/user.route");

// ------------middleware & app config------------
connectDB()
connectCloudinary()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// -----------api endpoints-----------
app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/user", userRouter)




app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
})