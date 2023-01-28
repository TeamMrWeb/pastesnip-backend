const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => {
    const { id } = args
    const user = await userController.findById(id)
    return user
}
