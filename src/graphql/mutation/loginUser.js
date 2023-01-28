const authController = require('../../controllers/auth.controller')

module.exports = async (parent, args, context) => {
    const { email, password } = args
    const tokens = await authController.login(email, password)
    return tokens
}
