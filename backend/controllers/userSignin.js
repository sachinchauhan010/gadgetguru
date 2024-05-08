const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const userSignInConroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("You have not Registered");
    }
    const checkPassword = await bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      const tokenData = {
        _id:user._id,
        email:user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
      const tokenOption={
        httpOnly:true,
        secure:true,
      }
      res.cookie("token", token, tokenOption).json({
        message:"Login successfully",
        data:token,
        success:true,
        error:false,
      })
    } else {
      console.log("Enter Correct Password");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = userSignInConroller;
