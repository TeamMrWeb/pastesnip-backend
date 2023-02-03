const jwtService = require('./jwt.service')
const userService = require('./user.service')
const cryptService = require('./crypt.service')
const tokenService = require('./token.service')

module.exports = {
    generate_tokens: (user) => {
        const access = jwtService.jwt_sign(user, 'access')
        tokenService.create({ value: access, userId: user.id, type: 'access' })
        const refresh = jwtService.jwt_sign(user, 'refresh')
        tokenService.create({
            value: refresh,
            userId: user.id,
            type: 'refresh',
        })
        return { access, refresh }
    },
    delete_tokens: async (userId) => {
        return await tokenService.deleteMany({
            userId,
            type: { $in: ['access', 'refresh'] },
        })
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
            verified: user.verified,
        })
    },
    verify: async (token) => {
        const user = await jwtService.jwt_verify(token, 'access')
        if (!user) throw new Error('Invalid token')
        const token_db = await tokenService.find({
            userId: user.id,
            value: token,
            type: 'access',
        })
        if (!token_db) throw new Error('Token not found, please login again')
        return user
    },
    logout: async (token) => {
        const user = await module.exports.verify(token)
        console.info('A user logged out', user)
        await tokenService.delete({ value: token })
        return 'Logged out'
    },
    refresh: async (refresh_token) => {
        const user = await jwtService.jwt_verify(refresh_token, 'refresh')
        if (!user) throw new Error('Invalid refresh token')
        const token_db = await tokenService.find({
            userId: user.id,
            value: refresh_token,
            type: 'refresh',
        })
        if (!token_db)
            throw new Error('Refresh token not found, please login again')
        console.info('A refresh token was used', user)
        await module.exports.delete_tokens(user.id)
        return module.exports.generate_tokens({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            verified: user.verified,
        })
    },
}
