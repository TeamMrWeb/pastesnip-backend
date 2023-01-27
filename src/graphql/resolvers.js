module.exports = {
    Query: {
        hello: require('./query/hello'),
        users: require('./query/users'),
    },
    Mutation: {
        createNewUser: require('./mutation/createNewUser'),
    },
}
