const express = require('express');
const app = express();
const cors = require('cors');
const { waitForDB } = require('./db/db')
const PORT = process.env.PORT ||  5000
const { RootRouter } = require("./routes/index")

app.use(cors())
app.use(express.json())


app.use("/api/v1",RootRouter);

app.listen(PORT, () => {
    console.log("Server running on", PORT);
  });