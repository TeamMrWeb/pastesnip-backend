const mongoose = require('mongoose')
const { database } = require('../config')

module.exports = {
    database_connect: async () => {
        try {
            mongoose.set('strictQuery', false)
            await mongoose.connect(database.URI)
            console.info(
                `Connected to database ${mongoose.connection.name} on ${mongoose.connection.host}`,
            )
        } catch (error) {
            console.error(error)
        }
    },

    models: {
        User: require('./models/User'),
    },
}
