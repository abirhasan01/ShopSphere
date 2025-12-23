require("dotenv").config()
const userModel = require("../model/user.model");
const validator = require("validator")
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken")


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// ---------------user login-----------------
const loginUser = async (req, res) => {

}


// -------------user register--------------
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body

        // checking user already exist or not
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({
                success: false,
                message: "User already exist"
            })
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({
              success: false,
              message: "Please enter a valid email",
            });
        }
        if (password.length < 8) {
          return res.json({
            success: false,
            message: "Please enter a strong password",
          });
        }

        // hashing user passwor
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = await userModel({
            name,
            email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)

        res.json({
            success: true,
            token
        })

        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
};

// --------------Admin Login-------------
const adminLogin = async (req, res) => {};

module.exports = {
    loginUser,
    registerUser,
    adminLogin
}