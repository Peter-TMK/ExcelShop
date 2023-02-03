const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        longDescription: {
            type: String,
            default: '',
        },
        image: {
            type: String,
            default: '',
        },
        images: [
            {
                type: String,
            },
        ],
        brand: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        countInStock: {
            type: Number,
            required: true,
            min: 0,
            maximum: 255,
        },
        rating: {
            type: Number,
            default: 0,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

// changing _id to id for ease of access at frontend
ProductSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

ProductSchema.set('toJSON', {
    virtuals: true,
})

module.exports = mongoose.model('Product', ProductSchema)
