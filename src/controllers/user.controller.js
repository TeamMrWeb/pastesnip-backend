const userService = require('../services/user.service')
const errorObject = require('../utils/error')

module.exports = {
    create: async (user_payload) => {
        try {
            const user = await userService.create(user_payload)
            return user
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    getAll: async () => {
        try {
            const users = await userService.findAll()
            return users
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    findById: async (id) => {
        try {
            const user = await userService.findById(id)
            return user
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    deleteUser: async (id) => {
        try {
            const user = await userService.remove(id)
            return user
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    }
}
