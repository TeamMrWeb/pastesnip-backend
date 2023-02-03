const authController = require('../../controllers/auth.controller')

module.exports = async (parent, args, context) => {
    return await authController.sendVerificationEmail(context.user)
}
