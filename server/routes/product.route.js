const express = require('express')
const mongoose = require('mongoose')
const productRouter = express.Router()
const app = require('../app')
const Product = require('../models/product.model')
const Category = require('../models/category.model')
const productController = require('../controllers/product.controller')
const multer = require('multer');

// MIME type - Multipurpose Internet Mail Extension
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-').split('.').join('');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })

const uploadOptions = multer({ storage: storage })


productRouter.get(`/`, productController.getProductItems)

productRouter.get(`/featuredProduct/`, productController.getFeaturedProducts)

productRouter.get(`/featuredProduct/:count`, productController.getFeaturedProductsCount)

productRouter.get(`/productCount`, productController.getProductCount)

productRouter.get('/:id', productController.getProductById)

productRouter.post(`/uploadFile`, uploadOptions.single('image'), productController.postProduct)

productRouter.put('/:id', productController.updateProduct)

productRouter.delete('/:id', productController.deleteProduct)

module.exports = productRouter
