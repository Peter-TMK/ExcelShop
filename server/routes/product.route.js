const express = require('express');
const productRouter = express.Router()
const Product = require('../models/product.model')
const Category = require('../models/category.model')



productRouter.get('/', async (req, res) => {
    const productItem = await Product.find()
    // use select to choose specific data to be returned
    .select('name image -_id')

    if (!productItem) {
        res.status(500).json({
            error: 'No product found!',
        })
    }
    res.send(productItem)
})

productRouter.get('/:id', async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        res.status(500).json({
            error: 'No such product with such ID found!',
        })
    }
    res.status(200).send(product)
})

productRouter.post('/', async (req, res) => {

    // referencing the category to product
    // To confirm if category from user(front-end) is valid,
    // We create a new category request

    const category = await Category.findById(req.body.category)
    if(!category)
    return res.status(404).send('Category Not Found')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        longDescription: req.body.longDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    await product.save();

    if(!product)
    return res.status(404).send('Invalid Product Input')

    res.send(product);
})

module.exports = productRouter;