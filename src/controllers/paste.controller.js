const pasteService = require('../services/paste.service')
const errorObject = require('../utils/error')

module.exports = {
    create: async (paste_payload) => {
        try {
            const paste = await pasteService.create(paste_payload)
            return paste
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    getAll: async () => {
        try {
            const pastes = await pasteService.findAll()
            return pastes
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    findById: async (id) => {
        try {
            const paste = await pasteService.findById(id)
            return paste
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    }
}
