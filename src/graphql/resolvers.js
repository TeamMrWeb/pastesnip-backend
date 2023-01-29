const isLogged = require('./middlewares/isLogged')

module.exports = {
    Query: {
        me: isLogged(require('./query/me')),
        hello: require('./query/hello'),
        users: isLogged(require('./query/users')),
        getUserById: isLogged(require('./query/getUserById')),
    },
    Mutation: {
        createNewUser: isLogged(require('./mutation/createNewUser')),
        deleteUser: isLogged(require('./mutation/deleteUser')),
        updateUser: isLogged(require('./mutation/updateUser')),
        loginUser: require('./mutation/loginUser'),
        logoutUser: isLogged(require('./mutation/logoutUser')),
        refreshUser: require('./mutation/refreshUser'),
    },
}
