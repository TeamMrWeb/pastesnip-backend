const errorObject = require('../utils/error')

module.exports = {
    verifyOwnership: async (executer, id) => {
        try {
            if (executer.id !== id && executer.role !== 'admin')
                throw new Error('You are not authorized to delete this user')
            return true
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    }
    // TODO: Add more conditions or methods here related with other checkouts.
}