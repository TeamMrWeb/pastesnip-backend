const userService = require('../services/user.service')
const errorObject = require('../utils/error')
const verifyOwnership = require('../utils/verifyOwnership')

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
    updateUser: async (executer, payload) => {
        try {
            verifyOwnership(executer, payload.id)
            const existUsername = await userService.findByUsername(
                payload.username,
            )
            if (existUsername)
                throw new Error('Username already exist, please try another')
            return await userService.update(payload)
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    deleteUser: async (executer, id) => {
        try {
            verifyOwnership(executer, id)
            const user = await userService.remove(id)
            return user
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
}
