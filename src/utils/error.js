const { GraphQLError } = require('graphql')

module.exports = class extends GraphQLError {
    constructor({
        message = 'Internal Server Error',
        code = 'INTERNAL_SERVER_ERROR',
        data = null,
        secure = true,
        auth = false,
    }) {
        if (auth) super('Unauthorized')
        else if (secure) super('Internal Server Error')
        else super(message)
        console.error('Catched an error:', message)
        this.code = code
        this.data = data
        this.secure = secure
    }
}
