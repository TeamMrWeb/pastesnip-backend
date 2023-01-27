const { GraphQLError } = require('graphql')

module.exports = class extends GraphQLError {
    constructor({
        message = 'Internal Server Error',
        code = 'INTERNAL_SERVER_ERROR',
        data = null,
        secure = false,
    }) {
        if (secure) super('Internal Server Error')
        else super(message)
        this.code = code
        this.data = data
        this.secure = secure
    }
}
