const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

/* A middleware that parses the body of the request and makes it available in the req.body object. */
app.use(express.json())
app.use(morgan('tiny'))

const ProductSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number,
})

const Product = mongoose.model('Product', ProductSchema)

// require('dotenv').config()
require('dotenv/config')
const api = process.env.API_URL
const PORT = process.env.PORT

app.get(`${api}/products`, async (req, res) => {
    const productItem = await Product.find()

    if (!productItem) {
        res.status(500).json({
            error: 'No product found!',
        })
    }
    res.send(productItem)
})

app.post(`${api}/products`, (req, res) => {
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

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected successfully!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
