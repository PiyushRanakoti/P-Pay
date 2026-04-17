const express = require("express");
const SigninRouter = express.Router();
const zod = require("zod");
const { pool } = require("../../db/db");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const SignInCheck = zod.object({
  username: zod.string().email(),
  password: zod.string()
});

SigninRouter.post("/signin", async (req, res) => {
  try {
    const { success } = SignInCheck.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ message: "Invalid Signin Inputs" });
    }

    const { username, password } = req.body;

    // 🔍 Get user by username only
    const result = await pool.query(
      `SELECT id, firstname, lastname, password
       FROM users
       WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Incorrect Username or Password"
      });
    }

    const user = result.rows[0];

    // 🔐 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Username or Password"
      });
    }

    const token = jwt.sign({ userID: user.id }, JWT_SECRET);

    res.json({
      message: `Welcome ${user.firstname}`,
      token,
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = SigninRouter;