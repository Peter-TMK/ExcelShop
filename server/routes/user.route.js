const express = require('express');
const userRouter = express.Router()
const userController = require('../controllers/user.controller')
// const User = require('../models/user.model')
// const bcrypt = require('bcryptjs');

userRouter.get(`/`, userController.getUser)

userRouter.get('/:id', userController.getUserById)



module.exports = userRouter;