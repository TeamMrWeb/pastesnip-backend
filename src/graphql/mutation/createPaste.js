
const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) => {
    const { user } = context
    const paste = await pasteController.create({ ...args, author: user.id })
    return paste
}