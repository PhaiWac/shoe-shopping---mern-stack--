const router = require('express').Router() ;

const crypto = require('../help/hash') ; 

const User = require('../model/usermodel') ;
const Product = require('../model/productmodel')

const jwt = require('jsonwebtoken')

const upload = require('../help/multer') ;
const { ObjectId } = require('mongodb');

// Premission 
router.get('/permission',(req,res,next) => {
    if (!req.session.userid ) {
        return res.json('none');
    }

    if (req.session.isadmin) {
        return res.json('admin') ;
    }

    return res.json('user')
})

// History 
router.get('/history',async ( req, res, next) => {
    
    const user = await User.findById(req.session.userid) ;
    
    
    res.json(user.history) ;
})

// Order
const ChangeCount = async (id,count) => {
    const product = await Product.findById(id) ;
    
    // console.log(product) ;

    if ((product.count - count) < 0 ) return false; 
    
    // console.log(product.count - count)

    const update = await Product.findByIdAndUpdate(id,{count  : product.count - count}) ;

    return true ;
} 

router.post('/orders',async (req , res, next) => {
    const { orders , _id , cost , history} = req.session.userdata ;
    const { total } = req.body; 

    if (total <= 0 || total > cost) return res.status(207).json()

    let update = history ;
    
    let errorcount = false;
    const newHistory = orders.map(items => {
        update = [...update,{
            productid : items.productid ,
            productname : items.productname ,
            price : items.price ,
            count : items.count ,
            bought : Date.now().toString() 
        }]
        if (!ChangeCount(items.productid,items.count)) {
            errorcount = true ;
        } 
    })

    if (errorcount) return res.status(207).json({message : 'สินค้ามีไม่เพียงพอ'}) ;

    await User.findByIdAndUpdate(_id,{history : update , orders : []   }) ;

    res.status(200).json();
})

router.delete('/orders/:id',async ( req , res,next) => {
    const {id} = req.params ;

    const obid = new ObjectId(id) ;

    const data = await User.findById(req.session.userid) ;

    let Neworder = data.orders.find(item => {
        if (item.productid.toString() !== obid.toString()){
            return item ;
        } 
    }) ; 



    if (typeof Neworder != 'object' ) {
        await User.findByIdAndUpdate(req.session.userid,{orders : [] }) ;
    } else {
        await User.findByIdAndUpdate(req.session.userid,{orders : [Neworder] }) ;
    }



    res.status(200).json() ;

})

router.get('/orders',async ( req , res ,next) => {
    const token = req.cookies.jwt ;
    
    if (!token) return res.json([])

    const data = jwt.verify(token,'Project') ;
    const user = await User.findOne({email : data.email}) ;
    
    res.json(user.orders)
    
    
    next() ;
})

router.post('/order/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { count, user } = req.body;

        const product = await Product.findById(id);

        if (count > product.count || count == 0) {
            return res.status(207).json({ message: 'สินค้ามีจำนวนไม่เพียงพอ' });
        }

        const createOrder = {
            productid: product._id,
            productname: product.name,
            price: product.price * count,
            count: count
        };

        const getUser = await User.findById(user._id);

        const isItemInOrders = getUser.orders.some(order => order.productid.toString() === product._id.toString());

        if (!isItemInOrders) {
            await User.findByIdAndUpdate(user._id, { orders: [...user.orders, createOrder] });
        } else {
            const getdataUser = getUser.orders.find(order => order.productid.toString() === product._id.toString());
            await User.findByIdAndUpdate(user._id,
                {
                    $set: { 'orders.$[elem].count': getdataUser.count += count }
                },
                {
                    arrayFilters: [
                    { 'elem.productid': getdataUser.productid }
                    ],
                    new: true 
                },
            )
        }

        // await Product.findByIdAndUpdate(id,{count : product.count - count}) ;

        res.status(200).json({ message: 'การสั่งซื้อสำเร็จ' });
    } catch (error) {
        next(error);
    }
});


// Product 
router.post('/product',upload.single('file'),async ( req ,res,next) => {
    const {name , price , description ,count } = req.body ;

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
        count: count 
    })

    await AddProduct.save() ;

    res.status(200).json()

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

    const check = await User.findOne({email : email}) ;
    
    if (check ) return res.status(207).json()


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

       return  res.status(201).json()
    } catch (err) {
       return res.status(207).json();
    }   
    
    // next() ;
})

router.post('/login',async ( req ,res ,next) => {
    const {email , password} = req.body ;
    
    const user = await User.findOne({ email : email}).exec() ;

    if (!user) return res.status(204).json() ;

    if ( crypto.Decode(user.password,"Project") != password ) {
        return res.status(204).json() ;
    }
    
    if (!req.cookies.jwt) {
        const token = jwt.sign({email},'Project') ;
        res.cookie('jwt',token) ;
    } ;

    console.log('logged'); 

    res.status(201).json(user);
})

router.post('/logout',(req,res,next) => {
    res.clearCookie('jwt')
    req.session.userid = null ;
    if (req.session.isadmin) {
        req.session.isadmin = false ;
    }
    res.json('loggout Success')
    next() ;
})

router.get('/user',async (req,res,next) => {
    try {
        const token = req.cookies.jwt ;

        // console.log(token)

        if (!token) return res.status(207).json() ;
    
        const data = jwt.verify(token,'Project') ;
        const user = await User.findOne({email : data.email}) ;
    
        if (user) {
            return res.status(201).json(user) ;
        } else {
            return res.status(207).json() ;
        }
    } catch (err) {
        console.log(' get user ',err)
    }
})

router.delete('/user/:id',async ( req , res ,next) => {
    const {id } = req.params ;

    await User.findByIdAndDelete(id) ;

    res.status(201).json() ;

    next() ;
    
})

router.patch('/user/:id',async ( req, res ,next) => {
    const {id} = req.params ;
    
    if (!id ) {
        console.log(req.session.userid)
    }
    
    // await User.findByIdAndUpdate(id,req.body) ;
    
    // res.status(201).json() ;

    next() ;
})

router.get('/users',async ( req, res, next) => {
    const user = await User.find({ email: { $ne: "admin@gmail.com" } }) ;

    res.json(user) ;
    next() ;
})

router.patch('/password/:id',async ( req , res, next) => {
    const {id} = req.params ;

    const user = await User.findById(id) ;

    const {oldpassword , newpassword } = req.body ;

    if ( crypto.Decode(user.password,'Project') !== oldpassword ) return res.status(207).json('รหัสผ่านไม่ถูกต้อง') ;

    await User.findByIdAndUpdate(id,{password : crypto.Encode(newpassword,"Project")} ) ;

    res.status(201).json() ;
    next() ;
})

module.exports = router ;