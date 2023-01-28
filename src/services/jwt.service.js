const jwt = require('jsonwebtoken')
const constants = require('../config').jwt

const get_config = (type) => {
    if (type === 'access') return constants.ACCESS_TOKEN
    else if (type === 'refresh') return constants.REFRESH_TOKEN
    else if (type === 'email') return constants.EMAIL_VERIFICATION
    else return null
}

module.exports = {
    jwt_sign: (payload, type, options) => {
        const { SECRET, EXPIRES_IN } = get_config(type)
        console.info(`Signin a ${type} token with payload`, payload)
        return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN, ...options })
    },
    jwt_verify: (token, type) => {
        const { SECRET } = get_config(type)
        console.info(`Verifying a ${type} token`)
        return jwt.verify(token, SECRET)
    },
}
