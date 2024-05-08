const userModel = require("../models/user.model");

async function useDetailsController(req, res){
    try {
        const user=await userModel.findById(req.userId);
        res.status(200).json({
            error:false,
            success: true,
            message:"User Details",
            data:user,
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success:false,
        })
    }
}
module.exports=useDetailsController;