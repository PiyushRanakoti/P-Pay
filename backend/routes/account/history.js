const express = require('express');
const HistoryRouter = express.Router();
const { pool } = require("../../db/db");
const { AuthMiddleware } = require('../../middleware/middleware');

// Get transaction history for a user
HistoryRouter.get("/history", AuthMiddleware, async (req, res) => {
    try {
        const userId = req.userID;
        const limit = req.query.limit || 50;
        const offset = req.query.offset || 0;

        // Fetch all transactions involving this user (as sender or receiver)
        const result = await pool.query(
            `SELECT 
        id,
        sender_id,
        receiver_id,
        amount,
        type,
        created_at,
        (SELECT firstname FROM public.users WHERE id = transactions.sender_id) as sender_first_name,
        (SELECT firstname FROM public.users WHERE id = transactions.receiver_id) as receiver_first_name
      FROM public.transactions
      WHERE sender_id = $1 OR receiver_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3`,
            [userId, limit, offset]
        );

        // Get total count for pagination
        const countResult = await pool.query(
            `SELECT COUNT(*) as total FROM public.transactions
       WHERE sender_id = $1 OR receiver_id = $1`,
            [userId]
        );

        const transactions = result.rows.map(txn => ({
            id: txn.id,
            amount: parseFloat(txn.amount),
            type: txn.type,
            timestamp: txn.created_at,
            senderId: txn.sender_id,
            receiverId: txn.receiver_id,
            senderFirstName: txn.sender_first_name,
            receiverFirstName: txn.receiver_first_name,
            isSender: txn.sender_id === userId,
            status: 'completed' // assuming all DB transactions are completed
        }));

        return res.status(200).json({
            transactions,
            total: countResult.rows[0].total,
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

    } catch (err) {
        console.error("Error fetching transaction history:", err);
        return res.status(500).json({ message: "Error fetching transaction history" });
    }
});

module.exports = HistoryRouter;
