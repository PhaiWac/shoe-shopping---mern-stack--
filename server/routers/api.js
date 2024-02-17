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

router.delete('/product/:id',async ( req, res, next ) => {
    console.log('deleteing')
    const { id } = req.params ;

    await Product.findOneAndDelete({_id : id}) ;

    res.status(201).json()

    next()
})

router.patch('/product/:id',upload.single('file'),async ( req ,res, next) => {
    const { id } = req.params ;


    if (req.file) {
        req.body.file = req.file.filename ;
    } ;

    const  data = req.body ;
    console.log(data)
    const ew =  await Product.findByIdAndUpdate(id,data) ;

    // console.log(ew) ;
   

})

router.get('/product',async ( req, res ,next) => {
    const product = await Product.find() ;
    res.json(product) ;
})

// User ;
router.post('/register',async (req,res,next) => {
    const { email , username  , password , phone , address } = req.body ;


    try {
        const Register = new User({
            email : email ,
            username: username ,
            password: crypto.Encode(password,'Project'),
            phone: phone,
            address: String(address),
            cost: 0 
        })
    
        await Register.save() ;

        res.status(201).json()
    } catch (err) {
        res.status(207).json();
    }   
    
    next() ;
})

router.post('/login',async ( req ,res ,next) => {
    const {email , password} = req.body ;
    
    const user = await User.findOne({ email : email}).exec() ;

    if (!user) return res.status(204).json() ;

    if ( crypto.Decode(user.password,"Project") != password ) {
        return res.status(204).json() ;
    }
    
    if (!req.cookies.jwt) {
        const token = jwt.sign({email},'Project',{expiresIn : "1d"}) ;
        res.cookie('jwt',token) ;
    } ;

    console.log('logged'); 

    res.status(201).json(user);
})

router.post('/logout',(req,res,next) => {
    res.clearCookie('jwt')
    res.json('loggout Success')
    next() ;
})

router.get('/user',async (req,res,next) => {
    const token = req.cookies.jwt ;

    if (!token) return res.status(207).json() ;

    const data = jwt.verify(token,'Project') ;
    const user = await User.findOne({email : data.email}) ;

    if (user) {
        return res.status(201).json(user) ;
    } else {
        return res.status(207).json() ;
    }
    next()
})


module.exports = router ;