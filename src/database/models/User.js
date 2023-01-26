const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 24,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [
                /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i,
                'Please a valid email address',
            ],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 64,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

module.exports = model('User', userSchema)
