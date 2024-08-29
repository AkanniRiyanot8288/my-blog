const User = require("../model/User");
const appErr = require(require("../utils/appErr"));
const getTokenFromHeader = require("..utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  // get token from header
  const token = getTokenFromHeader(req);
  // verify token
  const decodedUser = verifyToken(Token)
  // save the user into req obj
  req.userAuth = decodedUser.id;
  // find the user in DB
  const user = await User.findById(decodedUser.id);
  // check if the user is admin
  if (user.isAdmin){
    return next();
  }else {
    return next(appErr("Access Denied, Admin only", 404));
  }
};

module.exports = isAdmin;