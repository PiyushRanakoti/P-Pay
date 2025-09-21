const express = require('express');
const AccountRouter = express.Router();
const { User,  Account}= require('../db');
const { AuthMiddleware } = require('../Middleware');


AccountRouter.get("/balance", AuthMiddleware, async (req,res) => {
    const UserId = req.UserId

    const account = await Account.findOne({
        UserId
    })

    res.json({
        balance : account.balance
    })
})

AccountRouter.put("/deposit",AuthMiddleware,async (req,res) => {

    const Amount = req.body.amount
    
    const UserAccount = await Account.findOne({
        userId : req.userId
    })

   try {
        
        UserAccount.balance += Amount
        await UserAccount.save()
        res.json({
            message : `${Amount} Successfully deposited in your account`
        })

    } catch (error) {
         res.json({
            message : `Deposit failed. Please try again later`
        })
   }




})

AccountRouter.post("/transfer" , AuthMiddleware , async (req,res) => {
    const to = req.body.to
    const amount = Number(req.body.amount)

    console.log(req.userId)
    const SenderAccount = await Account.findOne({
        userId: req.userId
    })

    const ReceiverAccount = await Account.findOne({
        userId: to
    })

    console.log(ReceiverAccount)
    console.log(SenderAccount)

    if(SenderAccount.balance < amount){
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }

    if(!ReceiverAccount) {
        return res.status(411).json({
            message : "INVALID Account"
        })
    }


    // ------------------------Doing Transfer ----------------------------

     await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    );

    await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
    );


    res.json({
        message: "Transfer successful"
    })

    
})


module.exports = AccountRouter