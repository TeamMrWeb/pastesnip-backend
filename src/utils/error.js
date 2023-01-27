const { GraphQLError } = require('graphql')

module.exports = class extends GraphQLError {
    constructor({
        message = 'Internal Server Error',
        code = 'INTERNAL_SERVER_ERROR',
        data = null,
        secure = true,
    }) {
        if (secure) super('Internal Server Error')
        else super(message)
        console.error(message)
        this.code = code
        this.data = data
        this.secure = secure
    }
}
