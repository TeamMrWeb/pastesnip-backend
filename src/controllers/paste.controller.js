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
    delete: async (executer, id) => {
        try {
            const paste = await pasteService.findById(id)
            if (!paste) throw new Error('Paste not found')
            const authorId = paste.author.toString()
            if (
                (authorId !== executer.id && executer.role === 'admin') ||
                authorId === executer.id
            ) {
                await pasteService.delete(id)
                return 'Paste deleted successfully'
            } else
                throw new Error('You are not authorized to delete this paste')
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
    },
}
