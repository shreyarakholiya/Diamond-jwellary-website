const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User  = require("../models/userModel");

// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return next(new ErrorHandler("Please login to access this resource",401));
//     }

    
//         const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decodedData.id);

//         next();
    
// });


exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      return next(new ErrorHandler("Please login to access this resource", 401));
    }
  
    try {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedData.id);
  
      if (!user) {
        return next(new ErrorHandler("Invalid Token", 401));
      }
  
      req.user = user;
  
      next();
  
    } catch (error) {
      return next(new ErrorHandler("Invalid Token", 401));
    }
  });



exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return next(new ErrorHandler('User role is not set', 401));
        }

        if (roles.includes('user') && req.user.role === 'USER') {
            return next();
        }

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role '${req.user.role}' is not allowed to access this resource`, 403));
        }

        next();
    };
};









