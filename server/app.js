const express = require('express') ;
const app = express()
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const cookieParser = require('cookie-parser') ;
var session = require('express-session')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser()) ;
  
app.use(session({
    secret: 'Project',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use(async (req,res,next) => {
    const uri = 'mongodb+srv://phai:123@endproject.pmadhqg.mongodb.net/project';
    await mongoose.connect(uri);
    // console.log('connected')
    next() ;
})

app.listen(9999,() => {
    console.log('server start 9999') ;
})

const getData = require('./middleware/auth')

const api = require('./routers/api') ;


app.use('/api',getData,api) ;