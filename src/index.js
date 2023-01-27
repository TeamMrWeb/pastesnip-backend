const { server } = require('./app')
const { global } = require('./config')
const { database_connect } = require('./database')

// export for testing
module.exports = server.listen(global.PORT, async () => {
    try {
        await database_connect()
        const url = `${global.PROTOCOL}://${global.DOMAIN}:${global.PORT}`
        console.info(`Server running`, {
            url,
            mode: global.MODE,
        })
        console.info(`GraphiQL running`, {
            url: `${url}/graphiql`,
        })
    } catch (error) {
        console.error('Server failed to start', error)
        throw error
    }
})
