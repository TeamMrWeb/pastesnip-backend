const { server } = require('./app')
const { global } = require('./config')
const { database_connect } = require('./database')

server.listen(global.PORT, async () => {
    try {
        await database_connect()
        const url = `${global.PROTOCOL}://${global.DOMAIN}:${global.PORT}`
        console.info(`Server running on ${url} in ${global.MODE} mode`)
        console.info(`GraphiQL running on ${url}/graphiql`)
    } catch (error) {
        console.error(error)
        throw error
    }
})
