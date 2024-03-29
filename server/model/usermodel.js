const mongoose = require('mongoose') ;
const { Schema } = mongoose ;

const UserSchema = new Schema({
    email : { 
        type : String , 
        unique : true 
    } ,
    password: String ,
    username: String ,
    phone: Number ,
    address: String ,
    cost: Number ,
    history: [
        {
            productid :  mongoose.ObjectId,
            productname: String,
            price: Number,
            count: Number ,
            bought: Date 
        }
    ],
    orders: [
        {
            productid: mongoose.ObjectId ,
            productname: String,
            price: Number ,
            count: Number
        }
    ]
})

module.exports = mongoose.model('user',UserSchema) ;