const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model.js");
const { default: mongoose } = require("mongoose");
async function userSignunController(req, res) {
  try {
    const { fullName, phoneNo, email, password } = req.body;
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      throw new Error("User Already Exist");
    }
    if (!fullName) {
      throw new Error("Please Provide Full Name");
    }
    if (!phoneNo) {
      throw new Error("Please Provide Phone Number");
    }
    if (!email) {
      throw new Error("Please Provide Email");
    }
    if (!password) {
      throw new Error("Please Provide Password");
    }
    // let salt=bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hashSync(password);
    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      ...req.body,
      Role: "General",
      password: hashPassword,
    };
    const userData = new userModel(payload);
    const saveUser =await userData.save();
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "Ok",
    });
  } catch (error) {
    res.json({
      message: error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignunController;
