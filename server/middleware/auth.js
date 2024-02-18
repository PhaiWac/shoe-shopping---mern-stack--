const User = require('../model/usermodel') ;

const jwt = require('jsonwebtoken')

const getData = async(req,res,next) => {
    const token = req.cookies.jwt ;

    if (!token) {
        req.userdata = null ;
        next()
        return ;
    }

    const data = jwt.verify(token,'Project') ;
    const user = await User.findOne({email : data.email}) ;

    req.userdata = user ;

    next() ;
}

module.exports = getData