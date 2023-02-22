const express = require('express');
const AuthRouter = express.Router()
const Auth = require('./auth')
// const userController = require('../controllers/user.controller')
const bcrypt = require('bcryptjs');


AuthRouter.post('/login', Auth.loginUser)

AuthRouter.post('/register', Auth.registerUser)


module.exports = AuthRouter;
