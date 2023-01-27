const userController = require('../../controllers/user.controller')

module.exports = (parent, args, context) => {
    const users = userController.getAll()
    return users
}
