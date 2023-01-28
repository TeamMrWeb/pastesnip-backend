const { createServer } = require('http')
const { createYoga } = require('graphql-yoga')
const { createSchema } = require('graphql-yoga')

const schema = createSchema({
    typeDefs: require('./graphql/typeDefs'),
    resolvers: require('./graphql/resolvers'),
})

module.exports = {
    server: createServer(
        createYoga({
            schema,
            context: async (request) => {
                return {
                    ...request,
                    user: await require('./graphql/middlewares/authenticate')(
                        request,
                    ),
                }
            },
            cors: {
                origin: '*',
                credentials: true,
            },
        }),
    ),
}
