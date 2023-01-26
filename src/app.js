const { createServer } = require('http')
const { createYoga } = require('graphql-yoga')
const { createSchema } = require('graphql-yoga')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { join } = require('path')

const schema = createSchema({
    typeDefs: loadFilesSync(join(__dirname, 'graphql', 'schema.graphql')),
    resolvers: require('./graphql/resolvers'),
})

module.exports = {
    server: createServer(
        createYoga({
            schema,
            cors: {
                origin: '*',
                credentials: true,
            },
            context: ({ req }) => {
                // for middlewares
            },
        }),
    ),
}
