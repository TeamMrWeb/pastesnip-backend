const authController = require('../../controllers/auth.controller')

module.exports = (parent, args, context) => {
    const { email, password } = args
    const tokens = authController.login(email, password)
    return tokens
}
