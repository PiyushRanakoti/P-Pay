const express = require('express');
const BalanceRouter = express.Router();
const { pool } = require("../../db/db");
const { AuthMiddleware } = require('../../middleware/middleware');

BalanceRouter.get("/balance", AuthMiddleware, async (req,res) => {
  try {
    const userID = req.userID;

    const result = await pool.query(
      "SELECT balance FROM accounts WHERE user_id = $1",
      [userID]
    );

    if(result.rows.length === 0){
      return res.status(404).json({ error: "Account not found" });
    }

    res.json({ balance: result.rows[0].balance });

  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = BalanceRouter;