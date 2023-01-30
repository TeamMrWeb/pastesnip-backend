const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => {
    return await userController.deleteUser(context.user, args.id)
}
