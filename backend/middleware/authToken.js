const jwt = require("jsonwebtoken");
async function authToken(req, res, next) {
  try {
    const userToken = req.cookies?.token || req.headers;
    if (!userToken) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
          });
    } else {
      jwt.verify(
        userToken,
        process.env.TOKEN_SECRET_KEY,
        function (err, decoded) {
          console.log("Decoded--->", decoded);
          console.log("Error in auth", err);
          req.userId = decoded?._id;
          next();
        }
      );
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = authToken;
