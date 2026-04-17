const express = require('express');
const router = express.Router()

//Account Routes
const BalanceRouter = require('./account/balance')
const TransferRouter = require('./account/transfer')
const DepositRouter = require('./account/deposit')
const HistoryRouter = require('./account/history')

//User Routes
const BulkRouter = require('./user/bulk')
const SigninRouter = require('./user/signin');
const SignUpRouter = require('./user/signup');


router.use("/user", BulkRouter, SigninRouter, SignUpRouter)
router.use('/account', BalanceRouter, TransferRouter, DepositRouter, HistoryRouter)


module.exports = {
    RootRouter: router
}