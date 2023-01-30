const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) => {
    const { user } = context
    const pastes = await pasteController.getAll({ author: user.id })
    return pastes
}