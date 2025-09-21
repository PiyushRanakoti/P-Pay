const { JWT_SECRET }= require('./config')
const jwt = require('jsonwebtoken');

function AuthMiddleware(req,res,next){
    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){

        return res.status(411).json({
            message : "NO token provided"
        })
    }

    const token = authHeader.split(' ')[1]
    try {
        
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded)
        req.userId = decoded.UserId;
        next();

    } catch (err) {
        return res.status(403).json({
            message : "Auth failed"
        });
    }
}

module.exports = {
    AuthMiddleware
}