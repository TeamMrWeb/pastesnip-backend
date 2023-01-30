const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) => {
    return await pasteController.delete(context.user, args.id)
}
