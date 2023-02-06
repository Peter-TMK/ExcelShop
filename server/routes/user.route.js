const express = require('express');
const userRouter = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');

userRouter.get(`/`, async (req, res) =>{
    const userList = await User.find().select('name city country');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

userRouter.get('/:id', async(req,res)=>{
    const user = await User.findById(req.params.id).select('name city country');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})

userRouter.post('/login', async (req,res) => {
    const user = await User.findOne({email: req.body.email})
    // const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }
    if(user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
        res.status(200).send('user authenticated!') 
    } else {
       res.status(400).send('password is wrong!');
    }
    //    res.status(200).send(user);
})

userRouter.post('/', async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save();

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})



module.exports = userRouter;