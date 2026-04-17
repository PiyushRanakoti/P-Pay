const express = require('express');
const TransferRouter = express.Router();
const { pool } = require("../../db/db");
const { AuthMiddleware } = require('../../middleware/middleware');


TransferRouter.post("/transfer", AuthMiddleware, async (req,res)=>{
  const client = await pool.connect();

  try{

    const sender = req.userID;
    const receiver = req.body.to;
    const amount = Number(req.body.amount);

    if(amount <= 0){
      return res.status(400).json({ message:"Invalid amount" });
    }

    await client.query("BEGIN");

    const senderRes = await client.query(
      "SELECT balance FROM accounts WHERE user_id=$1",
      [sender]
    );

    if(senderRes.rows.length === 0){
      throw new Error("Sender account not found");
    }

    if(senderRes.rows[0].balance < amount){
      throw new Error("Insufficient Balance");
    }

    const receiverRes = await client.query(
      "SELECT id FROM accounts WHERE user_id=$1",
      [receiver]
    );

    if(receiverRes.rows.length === 0){
      throw new Error("Invalid account");
    }

    await client.query(
      "UPDATE accounts SET balance = balance - $1 WHERE user_id=$2",
      [amount, sender]
    );

    await client.query(
      "UPDATE accounts SET balance = balance + $1 WHERE user_id=$2",
      [amount, receiver]
    );

    // Insert transaction record
    await client.query(
      `INSERT INTO public.transactions (sender_id, receiver_id, amount, type)
       VALUES ($1, $2, $3, $4)`,
      [sender, receiver, amount, 'transfer']
    );

    await client.query("COMMIT");

    res.json({
      message:`Transferred ₹${amount} successfully`
    });

  } catch(err){

    await client.query("ROLLBACK");
    res.status(400).json({ message: err.message });

  } finally{
    client.release();
  }
});

module.exports = TransferRouter ;