const express = require('express');
const categoryRouter = express.Router()
// const Category = require('../models/category.model')
const categoryController = require('../controllers/category.controller')


categoryRouter.get('/', categoryController.getCategoryList)

categoryRouter.get('/:id', categoryController.getCategoryById)

categoryRouter.post('/', categoryController.postCategory)

categoryRouter.put('/:id', categoryController.updateCategory)

categoryRouter.delete('/:id', categoryController.deleteCategory)


module.exports = categoryRouter;