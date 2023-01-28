const isLogged = require('./middlewares/isLogged')

module.exports = {
    Query: {
        hello: require('./query/hello'),
        users: isLogged(require('./query/users')),
        getUserById: isLogged(require('./query/getUserById')),
    },
    Mutation: {
        createNewUser: isLogged(require('./mutation/createNewUser')),
        deleteUser: isLogged(require('./mutation/deleteUser')),
        loginUser: require('./mutation/loginUser'),
    },
}
