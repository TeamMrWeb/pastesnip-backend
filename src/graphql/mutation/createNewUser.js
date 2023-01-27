const userController = require('../../controllers/user.controller')

module.exports = (parent, args, context, info) => {
    console.log('createNewUser mutation called')
    const user = userController.create(args)
    return user
}
