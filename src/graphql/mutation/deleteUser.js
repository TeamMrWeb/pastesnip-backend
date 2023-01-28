const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => {
    const user = await userController.deleteUser(context.user, args.id)
    return user
}
