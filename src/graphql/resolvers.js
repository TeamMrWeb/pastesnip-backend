module.exports = {
    Query: {
        hello: require('./query/hello'),
    },
    Mutation: {
        createNewUser: require('./mutation/createNewUser'),
    },
}
