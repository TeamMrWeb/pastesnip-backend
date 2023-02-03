const authService = require('../services/auth.service')
const userService = require('../services/user.service')
const emailService = require('../services/email.service')
const errorObject = require('../utils/error')
const { global } = require('../config')

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
    sendVerificationEmail: async (user_payload) => {
        try {
            const user = await userService.findById(user_payload.id)
            if (!user) throw new Error('User not found')
            if (user.verified) throw new Error('User already verified')
            const email_token = await authService.generate_email_token({
                id: user.id,
                email: user.email,
            })
            await emailService.send({
                to: user.email,
                subject: 'Verify your Pastesnip account',
                template: 'email-verification.ejs',
                context: {
                    title: 'Email verification',
                    name: user.username,
                    message:
                        'Please verify your email address by clicking the button below.',
                    link: `${global.FRONTEND_URL}/verifyemail/${email_token}`,
                },
            })
            return 'Email verification sent successfully'
        } catch (error) {
            throw new errorObject({ message: error.message })
        }
    },
    verifyEmailToken: async (token) => {
        try {
            const response = await authService.verify_email(token)
            console.info('User email verified successfully', response)
            return 'Your account has been verified successfully'
        } catch (error) {
            throw new errorObject({ message: error.message, auth: true })
        }
    },
}
