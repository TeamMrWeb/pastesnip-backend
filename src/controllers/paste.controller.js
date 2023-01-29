const pasteService = require('../services/paste.service')
const errorObject = require('../utils/error')

module.exports = {
    newPaste: async (paste) => {
        try {
            const paste = await pasteService.create(paste)
            return paste
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    }
}