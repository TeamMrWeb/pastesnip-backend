const { expect } = require('chai')
const { jwt_sign, jwt_verify } = require('../../src/services/jwt.service')

let token = null
const payload = { id: 1, username: 'test' }

describe('UNIT TEST: jwt.service', () => {
    it('should sign a jwt access token', async () => {
        token = await jwt_sign(payload, 'access')
        expect(token).to.be.a('string')
    })

    it('should verify a jwt access token', async () => {
        const decoded = await jwt_verify(token, 'access')
        expect(decoded.id).to.equal(payload.id)
        expect(decoded.username).to.equal(payload.username)
    })
})
