const express = require('express');
const DepositRouter = express.Router();
const { pool } = require("../../db/db");
const { AuthMiddleware } = require('../../middleware/middleware');

DepositRouter.put("/deposit", AuthMiddleware, async (req,res)=>{
  try{
    const { amount } = req.body;
    const userID = req.userID;

    if(!amount || amount <= 0){
      return res.status(400).json({ message: "Invalid deposit amount" });
    }

    const result = await pool.query(
      `UPDATE accounts
       SET balance = balance + $1
       WHERE user_id = $2
       RETURNING balance`,
      [amount, userID]
    );

    if(result.rows.length === 0){
      return res.status(404).json({ message: "Account not found" });
    }

    res.json({
      message: `₹${amount} successfully deposited`,
      balance: result.rows[0].balance
    });

  } catch(err){
    console.error(err);
    res.status(500).json({ message:"Deposit failed" });
  }
});

module.exports = DepositRouter;