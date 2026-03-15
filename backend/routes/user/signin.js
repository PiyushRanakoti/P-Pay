const express = require("express");
const SigninRouter = express.Router();
const zod = require("zod");
const { pool } = require("../../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const SignInCheck = zod.object({
    username : zod.string().email(),
    password : zod.string()
})


SigninRouter.post("/signin", async(req,res)=>{

  const { success } = SignInCheck.safeParse(req.body);

  if(!success){
    return res.status(400).json({ message:"Invalid Signin Inputs" });
  }

  const { username,password } = req.body;

  const result = await pool.query(
    `SELECT id,firstname,lastname
     FROM users
     WHERE username=$1 AND password=$2`,
    [username,password]
  );

  if(result.rows.length === 0){
    return res.status(400).json({
      message:"Incorrect Username or Password"
    });
  }

  const user = result.rows[0];

  const token = jwt.sign({ userID:user.id },JWT_SECRET);

  res.json({
    message:`Welcome ${user.firstname}`,
    token,
    user:{
      id:user.id,
      firstname:user.firstname,
      lastname:user.lastname
    }
  });

});

module.exports = SigninRouter