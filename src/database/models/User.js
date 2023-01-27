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
        about: {
            type: String,
            trim: true,
            maxlength: 128,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        verified: {
            type: Boolean,
            default: false,
        },
        avatar: {
            secure_url: {
                type: String,
                default: null,
            },
            public_id: {
                type: String,
                default: null,
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

module.exports = model('User', userSchema)
