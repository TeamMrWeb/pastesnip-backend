const userController = require('../../controllers/user.controller')

module.exports = (parent, args, context) => {
    const user = userController.deleteUser(args.id)
    return user
}