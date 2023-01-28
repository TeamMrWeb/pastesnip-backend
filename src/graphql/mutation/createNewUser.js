const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context, info) => {
    const user = await userController.create(args)
    return user
}
