const { models } = require('../database')
const { Paste } = models

module.exports = {
    create: async (paste_payload) => {
        const newPaste = await Paste.create(paste_payload)
        return newPaste.populate('author')
    }
}
