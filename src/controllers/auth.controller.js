const authService = require('../services/auth.service')
const errorObject = require('../utils/error')

module.exports = {
    login: async (email, password) => {
        try {
            const response = await authService.login(email, password)
            return response
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    logout: async (token) => {
        try {
            return await authService.logout(token)
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    verify: async (token) => {
        try {
            const response = await authService.verify(token)
            console.info('User verified successfully', response.id)
            return response
        } catch (error) {
            throw new errorObject({ message: error.message, auth: true })
        }
    },
    refresh: async (token) => {
        try {
            if (!token)
                throw new errorObject({ message: 'Refresh token not provided' })
            return await authService.refresh(token)
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
}
