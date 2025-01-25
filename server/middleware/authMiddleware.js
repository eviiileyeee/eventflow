const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Protect routes with authentication
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get token from Authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is found
  if (!token) {
    return next(new AppError('Please log in to access this route', 401));
  }

  // 2) Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    // Grant access to the protected route
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Invalid token, please log in again', 401));
  }
});

// Restrict access to specific roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
