const express=require('express');

const router=express.Router();
const userSignUpController=require('../controllers/userSignup.js');
const userSignInConroller=require('../controllers/userSignin.js');
const authToken = require('../middleware/authToken.js');
const useDetailsController = require('../controllers/userDetails.js');


router.post("/signup", userSignUpController);
router.post("/signin", userSignInConroller);
router.get("/user-details",authToken,useDetailsController)
module.exports= router;