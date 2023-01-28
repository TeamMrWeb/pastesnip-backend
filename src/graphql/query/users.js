const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => {
    const users = await userController.getAll()
    return users
}
