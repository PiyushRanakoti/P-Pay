const express = require('express');
const DepositRouter = express.Router();
const { pool } = require("../../db/db");
const { AuthMiddleware } = require('../../middleware/middleware');

DepositRouter.put("/deposit", AuthMiddleware, async (req, res) => {
  const client = await pool.connect();
  try {
    const { amount } = req.body;
    const userID = req.userID;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit amount" });
    }

    await client.query("BEGIN");

    const result = await client.query(
      `UPDATE accounts
       SET balance = balance + $1
       WHERE user_id = $2
       RETURNING balance`,
      [amount, userID]
    );

    if (result.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Account not found" });
    }

    // Insert transaction record
    await client.query(
      `INSERT INTO public.transactions (sender_id, receiver_id, amount, type)
       VALUES ($1, $2, $3, $4)`,
      ['SYSTEM0000', userID, amount, 'deposit']
    );

    await client.query("COMMIT");

    res.json({
      message: `₹${amount} successfully deposited`,
      balance: result.rows[0].balance
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ message: "Deposit failed" });
  } finally {
    client.release();
  }
});

module.exports = DepositRouter;