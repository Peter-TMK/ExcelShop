const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Order', OrderSchema)
