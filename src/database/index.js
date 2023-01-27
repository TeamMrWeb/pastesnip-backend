const mongoose = require('mongoose')
const { database, global } = require('../config')

module.exports = {
    database_connect: async () => {
        try {
            mongoose.set('strictQuery', false)
            await mongoose.connect(database.URI)
            if (global.MODE === 'development') mongoose.set('debug', true)
            console.info(
                `Connected to database ${mongoose.connection.name} on ${mongoose.connection.host}`,
            )
        } catch (error) {
            console.error(error)
        }
    },
    database_close: async () => {
        try {
            await mongoose.connection.close()
            console.info('Database connection closed')
        } catch (error) {
            console.error(error)
        }
    },
    models: {
        User: require('./models/User'),
    },
}
