const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Category', CategorySchema)
