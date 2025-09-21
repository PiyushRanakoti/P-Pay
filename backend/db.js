const { default: mongoose, Mongoose } = require("mongoose");
const { string } = require("zod");

mongoose.connect("mongodb+srv://ranakotipiyush25:Piyush%402509@cluster0.2d4ttx6.mongodb.net/paytm")
.then(()=>{
    console.log("DB Connected")
})
.catch(()=>{
    console.log("some DB error aagya")
})


const UserSchema = mongoose.Schema({
   username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const AccountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User',
        required : true
    },

    balance : {
        type : Number ,
        required : true
    }
})

const User = mongoose.model("User",UserSchema);
const Account = mongoose.model('Account', AccountSchema);


module.exports = {
    User,
    Account
}