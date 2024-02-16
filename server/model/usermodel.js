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
            price: Number,
            count: Number ,
            bought: Date 
        }
    ]
})

module.exports = mongoose.model('user',UserSchema) ;