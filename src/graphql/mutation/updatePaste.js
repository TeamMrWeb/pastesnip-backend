const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) => {
    return await pasteController.update(args)
}