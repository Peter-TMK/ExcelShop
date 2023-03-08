const express = require('express');
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
// const User = require('../models/user.model')
// const bcrypt = require('bcryptjs');
// ======================================
// const jwt = require('jsonwebtoken');
const passport = require('passport');
// const app = require('../app');
require("../config/verifyBearerToken")
userRouter.use(passport.initialize());
// ========================================
 
userRouter.get(`/`, passport.authenticate('jwt', {session: false}), userController.getUser)

userRouter.get('/:id', passport.authenticate('jwt', {session: false}), userController.getUserById)



module.exports = userRouter;