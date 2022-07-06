const express=require('express')
const mongoose=require('mongoose')
const User=require('../models/user')
const router=express.Router();

router.post('/edit',async(req,res)=>{
    const {id,firstname,lastname,phone,email}=req.body
    const user=User.findByIdAndUpdate(id,{firstname,lastname,email,phone})
    res.redirect(`user/${id}`)
})

router.get('/',async(req,res)=>{
    const allUsers=await User.find({})
    res.render('user/show',{allUsers})
})
router.get('/new',(req,res)=>{
    res.render('user/new')
})
router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById(id);
    res.render('user/showone',{user})
})
router.get('/:id/edit',async(req,res)=>{
    const id=req.params.id;
    const user=await User.findById(id)
    res.render('user/edit',{user})
})


router.get('/:id/delete',async(req,res)=>{
    const id=req.params.id;
    const user=await User.findByIdAndDelete(id);
    res.redirect('/user')
})

router.post('/new',async(req,res)=>{
    const {firstname,lastname,email,phone}=req.body;
    console.log(firstname,lastname,email,phone)
    const conf=await User.insertMany({firstname,lastname,email,phone})
    res.redirect('/user')
})
module.exports=router;
