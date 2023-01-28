const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => {
    const { user } = context
    return await userController.findById(user.id)
}
