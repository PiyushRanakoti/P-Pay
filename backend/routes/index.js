const express = require('express');
const router = express.Router()

const { UserRouter } = require("./user")
const AccountRouter =  require('./account')


router.use("/user",UserRouter)
router.use('/account',AccountRouter)


module.exports = {
    RootRouter : router
}