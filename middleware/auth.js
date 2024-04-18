const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

//check is user is authenticated

exports.isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    //make sure token exists
    if(!token) {
        return next(new ErrorResponse('You are not authorized', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse(error.message, 401));
    }
}


//middleware for admin access

exports.isAdmin = async (req, res, next) => {
    const {role} = req.user;
    if(role === 0) {
        return next(new ErrorResponse('You are not authorized, must be admin', 401));
    }
    next();
}