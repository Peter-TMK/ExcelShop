// const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// const app = require('../app');
// const userRouter = express.Router()
// const userController = require('../controllers/user.controller')

// ================ SESSION-BASED AUTH STRATEGY - STORE SESSION/DATA AT BACKEND ====================

// const session = require('express-session');
// const mongostore = require('connect-mongo');
// npm i express-session connect-mongo passport passport-local
// app.use(session({
//     secret: 'seekrit',
//     resave: false,
//     saveUninitialized: true,
//     store: mongostore.create({
//         mongoUrl: 'mongodb://localhost:27017/ExcelShopAPI',
//         collectionName: 'sessions'
//     }),
//     cookie: {
//         maxAge: 1000*60*60*24
//     }
// }));
// =============================================

const registerUser = async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.passwordHash, 12),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })
    user = await user.save()

    if (!user) return res.status(400).send('the user cannot be created!')
    res.send(user)
}

// const loginUser = async (req, res) => {
//     const user = await User.findOne({email: req.body.email})
//     // const secret = process.env.secret;
//     if(!user) {
//         return res.status(400).send('The user not found');
//     }
//     if(user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {

//         res.status(200).send('user authenticated!')
//     } else {
//         console.log(req.body.passwordHash)
//         console.log(user.passwordHash)
//        res.status(400).send('password is wrong!');
//     }
//     //    res.status(200).send(user);
// }

const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    // const secret = process.env.secret;
    if (!user) {
        return res.status(400).send('The user not found')
    }
    if (user && bcrypt.compareSync(req.body.passwordHash, user.passwordHash)) {
        // res.status(200).send('user authenticated!')

        const payload = {
            email: user.email,
            id: user._id,
        }
        const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
            expiresIn: '1d',
        })
        res.status(200).send({
            success: true,
            message: 'User authenticated & Logged In Successfully!',
            accessToken: 'Bearer ' + accessToken,
        })
    } else {
        // console.log(req.body.passwordHash)
        // console.log(user.passwordHash)
        res.status(400).send('password is wrong!')
    }
    //    res.status(200).send(user);
}

module.exports = {
    registerUser,
    loginUser,
}
