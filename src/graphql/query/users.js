const userController = require('../../controllers/user.controller')

module.exports = async (parent, args, context) => await userController.getAll()
