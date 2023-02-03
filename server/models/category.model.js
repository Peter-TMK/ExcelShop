const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
})


// changing _id to id for ease of access at frontend
CategorySchema.virtual('id').get(function () {
    return this._id.toHexString()
})

CategorySchema.set('toJSON', {
    virtuals: true,
})

module.exports = mongoose.model('Category', CategorySchema)
