const express = require('express');
const productRouter = express.Router()
const Product = require('../models/product.model')


productRouter.get('/', async (req, res) => {
    const productItem = await Product.find()

    if (!productItem) {
        res.status(500).json({
            error: 'No product found!',
        })
    }
    res.send(productItem)
})

productRouter.post('/', (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    })

    product
        .save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
})

module.exports = productRouter;