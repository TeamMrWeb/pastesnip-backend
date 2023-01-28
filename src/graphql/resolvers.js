const isOwnership = require('./middlewares/isOwnership')

module.exports = {
    Query: {
        hello: isOwnership(require('./query/hello')),
        users: require('./query/users'),
        getUserById: require('./query/getUserById'),
    },
    Mutation: {
        createNewUser: require('./mutation/createNewUser'),
    },
}
