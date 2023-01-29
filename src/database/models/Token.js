const { Schema, model } = require('mongoose')

const tokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['access', 'refresh', 'email'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
)

module.exports = model('Token', tokenSchema)
