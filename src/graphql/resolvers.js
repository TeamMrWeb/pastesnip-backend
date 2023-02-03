const isLogged = require('./middlewares/isLogged')

module.exports = {
    Query: {
        me: isLogged(require('./query/me')),
        hello: require('./query/hello'),
        users: isLogged(require('./query/users')),
        getUserById: isLogged(require('./query/getUserById'), {
            verified: true,
        }),
        pastes: isLogged(require('./query/pastes'), { verified: true }),
    },
    Mutation: {
        createNewUser: require('./mutation/createNewUser'),
        deleteUser: isLogged(require('./mutation/deleteUser'), {
            verified: true,
        }),
        updatePaste: isLogged(require('./mutation/updatePaste'), {
            verified: true,
        }),
        updateUser: isLogged(require('./mutation/updateUser'), {
            verified: true,
        }),
        createPaste: isLogged(require('./mutation/createPaste'), {
            verified: true,
        }),
        deletePaste: isLogged(require('./mutation/deletePaste'), {
            verified: true,
        }),
        sendVerificationEmail: isLogged(
            require('./mutation/sendVerificationEmail'),
        ),
        verifyEmailToken: require('./mutation/verifyEmailToken'),
        loginUser: require('./mutation/loginUser'),
        logoutUser: isLogged(require('./mutation/logoutUser')),
        refreshUser: require('./mutation/refreshUser'),
    },
}
