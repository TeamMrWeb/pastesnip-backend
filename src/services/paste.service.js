const { getPastes } = require('../controllers/paste.controller')
const { models } = require('../database')
const { Paste } = models

module.exports = {
    create: async (paste_payload) => {
        const newPaste = await Paste.create(paste_payload)
        return newPaste.populate('author')
    },
    find: async (options) => await Paste.findOne(options),
    findAll: async () => await Paste.find(),
    findById: async (id) => await Paste.findById(id),
    findByAuthor: async (author) => module.exports.find({ author })
}