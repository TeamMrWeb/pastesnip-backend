const authController = require('../../controllers/auth.controller')

module.exports = async (parent, args, context) => {
    const token = context.req.headers.email_token
    console.log('Verifying email token', token)
    return await authController.verifyEmailToken(token)
}
