const { models } = require('../database')
const { Paste } = models

module.exports = {
    create: async (paste_payload) => {
        const newPaste = await Paste.create(paste_payload)
        return newPaste.populate('author')
    },
    delete: async (id) => await Paste.findByIdAndDelete(id),
    find: async (options) => await Paste.findOne(options),
    findAll: async () => {
        const paste = await Paste.find().populate('author')
        return paste
    },
    findById: async (id) => await Paste.findById(id),
    findByAuthor: async (author) => module.exports.find({ author }),
}
