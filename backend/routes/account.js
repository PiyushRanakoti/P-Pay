const express = require('express');
const AccountRouter = express.Router();
const { User,  Account}= require('../db');
const { AuthMiddleware } = require('../Middleware');
const { default: mongoose } = require('mongoose');


AccountRouter.get("/balance", AuthMiddleware, async (req,res) => {
     try {
        const userID = req.userID;
        // console.log("userID:", userID);

        const account = await Account.findOne({
            userID : new mongoose.Types.ObjectId(userID)
        });

        // console.log("account:", account);

        if (!account) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ balance: account.balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
})

AccountRouter.put("/deposit",AuthMiddleware,async (req,res) => {
   try{
        const { amount } = req.body;
        const userID = req.userID;

        const UserAccount = await Account.findOne({ 
            userID: new mongoose.Types.ObjectId(userID) 
        });


        if (!UserAccount) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid deposit amount" });
        }

        UserAccount.balance += Number(amount);
        await UserAccount.save();

        res.json({
            message: `₹${amount} successfully deposited in your account`,
            balance: UserAccount.balance
        });
    }
    catch (error) {
    console.error(error);
    res.status(500).json({
        message: "Deposit failed. Please try again later"
    })}


})

AccountRouter.post("/transfer" , AuthMiddleware , async (req,res) => {
    const to = req.body.to
    const amount = Number(req.body.amount)

    const SenderAccount = await Account.findOne({
        userID : req.userID
    })

    const ReceiverAccount = await Account.findOne({
        userID : to
    })

    

    if(SenderAccount.balance < amount || amount < 0){
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
        { userID: req.userID },
        { $inc: { balance: -amount } }
    );

    await Account.updateOne(
        { userID: to },
        { $inc: { balance: amount } }
    );


    res.json({
        message: `Transfered ₹${amount} successfully to `
    })

    
})


module.exports = AccountRouter