const mongoose = require('mongoose') ;
const { Schema } = mongoose ;

const UserSchema = new Schema({
    name: String ,
    description: String ,
    price: Number ,
    img: String ,
    sale: Number ,
    count: Number
})

module.exports = mongoose.model('product',UserSchema) ;