const { registerUser, loginUser, adminLogin } = require("../controllers/user.controller")

const userRouter = require("express").Router()



userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/admin", adminLogin)


module.exports = userRouter