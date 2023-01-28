const mongoose = require('mongoose')
const { database, global } = require('../config')

module.exports = {
    database_connect: async () => {
        try {
            mongoose.set('strictQuery', false)
            await mongoose.connect(database.URI)
            if (global.MODE === 'development') mongoose.set('debug', true)
            console.info('Database established', {
                host: database.URI,
                database: mongoose.connection.name,
            })
        } catch (error) {
            console.error('Database connection error', error)
            throw error
        }
    },
    database_close: async () => {
        try {
            await mongoose.connection.close()
            console.info('Database connection closed')
        } catch (error) {
            console.error('Database connection close error', error)
        }
    },
    models: {
        User: require('./models/User'),
        Paste: require('./models/Paste'),
    },
}
