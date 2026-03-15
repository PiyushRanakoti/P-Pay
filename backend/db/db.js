//NEW Postgres Database
const { Pool } = require('pg') ;
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.DB_URL_NEW

const pool = new Pool({
    connectionString : url,
    ssl : {
        rejectUnauthorized : false
    }
});

pool.connect()
.then(client => {
    console.log("CONNECTED!!");
})
.catch(err => {
    console.error("Connection failed:", err);
});



module.exports = {
    pool
}













//  OLD MONGO DATABASE SCHEMA ------------------------------------------------

// const { default: mongoose, Mongoose } = require("mongoose");
// const { string } = require("zod");
// const dotenv = require('dotenv');

// dotenv.config();
// const DB_URL = process.env.DB_URL

// mongoose.connect(DB_URL)
// .then(()=>{
//     console.log("DB Connected")
// })
// .catch(()=>{
//     console.log("some DB error aagya")
// })


// const UserSchema = mongoose.Schema({
//    username: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true,
//         minLength: 3,
//         maxLength: 30
//     },
//     password: {
//         type: String,
//         required: true,
//         minLength: 6
//     },
//     firstname: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     },
//     lastname: {
//         type: String,
//         required: true,
//         trim: true,
//         maxLength: 50
//     }
// })

// const AccountSchema = mongoose.Schema({
//     userID : {
//         type : mongoose.Schema.Types.ObjectId ,
//         ref : 'User',
//         required : true
//     },

//     balance : {
//         type : Number ,
//         required : true
//     }
// })

// const User = mongoose.model("User",UserSchema);
// const Account = mongoose.model('Account', AccountSchema);


// module.exports = {
//     User,
//     Account
// }