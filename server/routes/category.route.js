const express = require('express');
const categoryRouter = express.Router()
// const Category = require('../models/category.model')
const categoryController = require('../controllers/category.controller')

const passport = require('passport');
// const app = require('../app');
require("../config/verifyBearerToken")
categoryRouter.use(passport.initialize());

categoryRouter.get('/', categoryController.getCategoryList)

categoryRouter.get('/:id', categoryController.getCategoryById)

categoryRouter.post('/', passport.authenticate('jwt', {session: false}), categoryController.postCategory)

categoryRouter.put('/:id', passport.authenticate('jwt', {session: false}), categoryController.updateCategory)

categoryRouter.delete('/:id', passport.authenticate('jwt', {session: false}), categoryController.deleteCategory)


module.exports = categoryRouter;