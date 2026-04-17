const express = require("express");
const SignUpRouter = express.Router();
const zod = require("zod");
const { pool } = require("../../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const SignUpCheck = zod.object({
  username: zod.string().email(),
  password: zod.string().min(6),
  lastname: zod.string(),
  firstname: zod.string()
});

SignUpRouter.post("/signup", async (req, res) => {
  try {
    const { success } = SignUpCheck.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: "Incorrect inputs" });
    }

    const { username, password, firstname, lastname } = req.body;

    const exist = await pool.query(
      "SELECT id FROM users WHERE username=$1",
      [username]
    );

    if (exist.rows.length) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    // 🔐 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    const userResult = await pool.query(
      `INSERT INTO users (username,password,firstname,lastname)
       VALUES ($1,$2,$3,$4)
       RETURNING id,firstname,lastname`,
      [username, hashedPassword, firstname, lastname]
    );

    const userID = userResult.rows[0].id;

    await pool.query(
      `INSERT INTO accounts (user_id,balance)
       VALUES ($1,$2)`,
      [userID, 1 + Math.random() * 10000]
    );

    const token = jwt.sign({ userID }, JWT_SECRET);

    res.json({
      message: `User Created Successfully\nWelcome ${firstname}`,
      token,
      user: {
        id: userID,
        firstname,
        lastname
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = SignUpRouter;