const errorObject = require('../../utils/error')

module.exports = (resolver) => async (parent, args, context, info) => {
    const { user } = context
    if (!user) throw new errorObject({ auth: true })
    return resolver(parent, args, context, info)
}
