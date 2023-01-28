const jwtService = require('./jwt.service')
const userService = require('./user.service')
const cryptService = require('./crypt.service')

module.exports = {
    generate_tokens: (user) => {
        return {
            access: jwtService.jwt_sign(user, 'access'),
            refresh: jwtService.jwt_sign(user, 'refresh'),
        }
    },
    login: async (email, password) => {
        const user = await userService.findByEmail(email)
        if (!user) throw new Error('User not found')
        const same_password = await cryptService.comparePassword(
            password,
            user.password,
        )
        if (!same_password) throw new Error('Wrong password')
        return module.exports.generate_tokens({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        })
    },
    verify: async (token) => {
        const user = await jwtService.jwt_verify(token, 'access')
        if (!user) throw new Error('Invalid token')
        return user
    },
}
