const express = require("express");
const UserRouter = express.Router();
const zod = require('zod')
const {User , Account}= require('../db')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const  { AuthMiddleware } = require("../Middleware");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const SignUpCheck = zod.object({
    username : zod.string().email(),
    password : zod.string(),
    lastname : zod.string(),
    firstname : zod.string()
})


UserRouter.post("/signup", async (req,res) => {
    
    const { success } = SignUpCheck.safeParse(req.body)

    if(!success){
        return res.status(211).json({
            message : "Incorrect inputs"
        })
    }

    const UserExist = await User.findOne({
        username : req.body.username 
    }) 

    if(UserExist){
        return res.status(211).json({
            message : "User Already Exist"
        })
    }

    const NewUser = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstname : req.body.firstname,
        lastname : req.body.lastname
    })

    const userID = NewUser._id

    /// --------------------Create New account ----------------------

    await Account.create({
        userID : userID,
        balance : 1 + Math.random()*10000
    })

    //----------------------------------

    const token = jwt.sign({
         userID 
    },JWT_SECRET)

    return res.json({
        message : "User Created Successfully \nPlease Sign in to Use",
        token : token,
        user: {
            id: NewUser._id,
            firstname: NewUser.firstname,
            lastname: NewUser.lastname,
        }
    })

})

const SignInCheck = zod.object({
    username : zod.string().email(),
    password : zod.string()
})

UserRouter.post("/signin", async(req,res) => {

    const { success } = SignInCheck.safeParse(req.body)

    if(!success){
        return res.status(400).json({
            message : "Some Error in Login please Try again"
        })
    }


    const UserCheck = await User.findOne({
        username : req.body.username,
        password : req.body.password

    })

    if(!UserCheck){
        return res.status(400).json({
            message : "User Doesn't Exist"
        })
    }

    const token = jwt.sign({
            userID : UserCheck._id
        },JWT_SECRET)

    return res.json({
        message : `Welcome ${UserCheck.firstname}` ,
        token : token,
        user: {
            id: UserCheck._id,
            firstname: UserCheck.firstname,
            lastname: UserCheck.lastname,
        }
        
    })

})

const UpdateCheck = zod.object({
  	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

UserRouter.put("/update", AuthMiddleware, async (req,res) => {

    const { success } = UpdateCheck.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message : "Error while Updating Info"
        })
    }

    await User.updateOne( 
        { _id: req.userID },     
        {$set : req.body }
    )

    res.json({
        message : "Update Successful"
    })
})

UserRouter.get('/bulk',async function (req,res) {
    const filter = req.query.filter || ""
    const excludeID = req.query.exclude

    const Users = await User.find({
        _id: { $ne: excludeID },  
        $or: [
            { firstname: { $regex: filter, $options: "i" } },
            { lastname: { $regex: filter, $options: "i" } }
        ]
    });

    res.json({
        user : Users.map(user => ({
            user : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id : user._id
        }))
    })
})

module.exports = {
    UserRouter
}



// ------------------------------------Hook------------

