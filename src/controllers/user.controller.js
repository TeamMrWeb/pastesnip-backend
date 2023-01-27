const userService = require('../services/user.service')
const { GraphQLError } = require('graphql')

module.exports = {
    create: async (user_payload) => {
        try {
            const user = await userService.create(user_payload)
            return user
        } catch (error) {
            throw new GraphQLError(error.message)
        }
    },
}
