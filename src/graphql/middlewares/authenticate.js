const authController = require('../../controllers/auth.controller')

module.exports = async (context) => {
    console.info('Authenticating a request', {
        origin: context.req.headers.origin,
        referer: context.req.headers.referer,
        query: context.params.query,
    })
    const user = await authController.verify(context.req.headers.auth)
    return user
}
