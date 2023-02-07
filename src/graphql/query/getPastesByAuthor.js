const pasteController = require('../../controllers/paste.controller')

module.exports = async (parent, args, context) =>
    await pasteController.findByAuthor(args.authorId)
