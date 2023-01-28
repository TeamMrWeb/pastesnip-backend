module.exports = (resolver) => async (parent, args, context, info) => {
    const { user } = context
    console.log('catched ', user, ' in isOwnership middleware')
    return resolver(parent, args, context, info)
}
