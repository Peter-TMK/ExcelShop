const mongoose = require('mongoose')
// const validator = require('validator')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your mail!'],
        lowercase: true,
        // validate: [validator.isEmail, 'Please provide a valid mail!'],
    },
    passwordHash: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: '',
    },
    apartment: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})
// changing _id to id for ease of access at frontend
UserSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

UserSchema.set('toJSON', {
    virtuals: true,
})

module.exports = mongoose.model('User', UserSchema)
