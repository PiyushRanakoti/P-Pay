const express = require("express");
const BulkRouter = express.Router();
const { pool } = require("../../db/db");


BulkRouter.get("/bulk", async(req,res)=>{

  const filter = req.query.filter || "";
  // const excludeID = req.query.exclude || NULL;

const result = await pool.query(
  `SELECT id, username, firstname, lastname
   FROM users
   WHERE (
     firstname ILIKE $1
     OR lastname ILIKE $1
     OR id ILIKE $1
   )
   AND id != 'SYSTEM0000'`,
  [`%${filter}%`]
);

  res.json({
    user: result.rows.map(u=>({
      user: u.username,
      firstname: u.firstname,
      lastname: u.lastname,
      _id: u.id
    }))
  });

});

module.exports = BulkRouter;