const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register = async (req,res,next)=>{
    const {username, email,password}= req.body;

    try {
        const user = await User.create({
            username, email, password
        });

        sendToken(user, 201, res);
    } catch (error) {
       next(error);
        
    }

    }
exports.login = async (req,res,next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorResponse("please provide email and password", 503));
    }

    try {
        const user = await User.findOne({email}).select("+password")

        if(!user){
            return next(new ErrorResponse("Invalid Credentials", 401));

        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401));

        }

        
        sendToken(user, 200, res);


        
    } catch (error) {
        res.status(500).json({
            success:false,
            error: error.message
        });
        
    }
}
exports.forgotpassword = async (req,res,next)=>{
    const {email} = req.body;

    try {
        //check if user exists in db
        const user = await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken()
        await user.save();
        // Create reset url to email to provided email
        const resetURL =` http://localhost:3000/psswordreset/${resetToken}`

          // HTML Message
            const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `;
    } catch (error) {
        
    }
}
exports.resetpassword =(req,res,next)=>{
    res.send('Reset Password Route');
}

const sendToken = (user, statusCode, res)=>{
    const token =user.getSignedToken()
    res.status(statusCode).json({success:true, token})
}
