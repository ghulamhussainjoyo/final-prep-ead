const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config')
exports.isAuthenticated = async (req,res,next)=>{

    try {
        const {token} =    req.cookies;

       jwt.verify(token,JWT_SECRET,async function(err,decoded){
            
            if(err) throw err;
            req.user = await User.findById(decoded.id)
            next();
          
        })
    } catch (error) 
    {
        next(error)    
    }




}