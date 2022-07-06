const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const ejsMate= require('ejs-mate')
const methodOverride= require('method-override')
const cookieParser= require('cookie-parser')
const session = require('express-session')
const userRoutes=require('./routes/user')
mongoose.connect('mongodb://localhost:27017/userManagement',{
    useNewUrlParser:true,   
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',()=>{
    console.log('database connected')
})

const User=require('./models/user')
require('dotenv').config();

app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));


app.get('/home',(req,res)=>{
    res.send('hey there!')
})
app.use('/user',userRoutes)

const port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('server started')
})