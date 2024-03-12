
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req,res,next) => {
    const {email} = req.body;
    const userExist = await User.findOne({email: email});
    if (userExist){
        return next (new ErrorResponse("Email already exists", 400))
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error);
    }
};


exports.signin = async (req,res,next) => {
    const {email, password} = req.body;
    //validation
    if (!email){
        return next (new ErrorResponse("please add a email", 403))
    }
    if (!password){
        return next (new ErrorResponse("please add a password", 403))
    }

    //chek user email
    const user = await User.findOne({email: email});
    if (!user){
        return next (new ErrorResponse("invalide credential", 404));
    }


    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        next(error);
    }
};