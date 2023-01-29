const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) => {
    const paste = await pasteController.newPaste(args)
    return paste
}