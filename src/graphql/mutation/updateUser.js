const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => {
    return await userController.updateUser(context.user, args)
}
