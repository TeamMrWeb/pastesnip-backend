const errorObject = require('../../utils/error')

module.exports =
    (
        resolver,
        options = {
            verified: null,
        },
    ) =>
    async (parent, args, context, info) => {
        const { user } = context
        if (!user) throw new errorObject({ auth: true })
        if (options.verified && user.verified !== options.verified)
            throw new errorObject({
                message: 'User not verified to perform this operation',
                auth: true,
            })
        return resolver(parent, args, context, info)
    }
