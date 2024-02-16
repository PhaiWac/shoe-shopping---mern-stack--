const router = require('express').Router() ;

const crypto = require('../help/hash') ; 

const User = require('../model/usermodel') ;
const Product = require('../model/productmodel')

const jwt = require('jsonwebtoken')

const upload = require('../help/multer') ;

// Product 
router.post('/product',upload.single('file'),async ( req ,res,next) => {
    const {name , price , description } = req.body ;

    let img = null ;
    if (req.file) {
        img = req.file.filename ;
    }

    const AddProduct = new Product({
        name: name ,
        price: price ,
        description: String(description) ,
        img: img ,
        sale: 0 ,
        count: 0 
    })

    await AddProduct.save() ;

    res.json('Add Product Success') ;

})

router.delete('/product',async ( req, res, next ) => {
    const { _id } = req.params ;

    const product = await Product.findById(_id) ;

    console.log(product) ;
})

router.patch('/product',upload.single('file'),async ( req ,res, next) => {
    const data = [] ;
    const { _id } = req.params ;
    
    for ( const key in req.body) {
        const value = req.body[key] ;
        if (value.length <= 0 ) continue ;
        data[key] = value ;
    } ;

    await Product.findByIdAndUpdate(_id,data) ;

})

// User ;
router.post('/register',async (req,res,next) => {
    const { email , username , password , phone , address } = req.body ;

    const Register = new User({
        email : email ,
        username: username ,
        password: crypto.Encode(password,'Project'),
        phone: phone,
        address: String(address),
        cost: 0 
    })

    await Register.save() ;
    
    next() ;
})

router.post('/login',async ( req ,res ,next) => {
    const {email , password} = req.body ;
    
    const user = await User.findOne({ email : email}).exec() ;

    if ( crypto.Decode(user.password,"Project") != password ) {
        return res.json('password not corret')
    }
    
    if (!req.cookies.jwt) {
        const token = jwt.sign({email},'Project',{expiresIn : "1d"}) ;
        res.cookie('jwt',token) ;
    } ;

    res.json('Logged') ;
})

router.post('/logout',(req,res,next) => {
    res.clearCookie('jwt')
    res.json('loggout Success')
    next() ;
})

router.get('/user',(req,res,next) => {

})

module.exports = router ;