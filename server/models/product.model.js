const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: Number,
})

module.exports = mongoose.model('Product', ProductSchema)