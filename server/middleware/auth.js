const User = require('../model/usermodel') ;

const jwt = require('jsonwebtoken')

const getData = async (req,res,next) => {
    
    const token = req.cookies.jwt ;

    if (!token) {
        // console.log('not have token')
       return next();
    }

    try {
        const data = jwt.verify(token,'Project') ;
        const user = await User.findOne({email : data.email}) ;
        req.session.userid = user._id ;
        req.session.userdata = user ;

        if (user.email == 'admin@gmail.com') {
            req.session.isadmin = true ;
        }
    } catch (err) {
        console.log(err)
    }


    next() ;
}

module.exports = getData