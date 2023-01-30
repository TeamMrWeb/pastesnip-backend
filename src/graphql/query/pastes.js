const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) => {
    const pastes = await pasteController.getAll()
    return pastes
}