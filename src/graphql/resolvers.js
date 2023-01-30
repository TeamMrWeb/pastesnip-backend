const isLogged = require('./middlewares/isLogged')

module.exports = {
    Query: {
        me: isLogged(require('./query/me')),
        hello: require('./query/hello'),
        users: isLogged(require('./query/users')),
        getUserById: isLogged(require('./query/getUserById')),
        pastes: isLogged(require('./query/pastes')),
    },
    Mutation: {
        createNewUser: require('./mutation/createNewUser'),
        deleteUser: isLogged(require('./mutation/deleteUser')),
        updateUser: isLogged(require('./mutation/updateUser')),
        loginUser: require('./mutation/loginUser'),
        logoutUser: isLogged(require('./mutation/logoutUser')),
        refreshUser: require('./mutation/refreshUser'),
        createPaste: isLogged(require('./mutation/createPaste')),
        deletePaste: isLogged(require('./mutation/deletePaste')),
    },
}
