const express = require('express');
const User = require('../models/user.model')
// const userRouter = express.Router()
// const userController = require('../controllers/user.controller')
const bcrypt = require('bcryptjs');



const registerUser = async (req, res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash.toString(), 10),
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
}

const loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    // const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }
    if(user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
        
        res.status(200).send('user authenticated!') 
    } else {
        console.log(req.body.passwordHash)
        console.log(user.passwordHash)
       res.status(400).send('password is wrong!');
    }
    //    res.status(200).send(user);
}

module.exports = {
    registerUser,
    loginUser,
}