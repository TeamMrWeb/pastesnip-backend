module.exports = (resolver) => async (parent, args, context, info) => {
    const { user } = context
    return resolver(parent, args, context, info)
}
