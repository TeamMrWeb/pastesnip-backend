const { expect } = require('chai')

const {
    hashPassword,
    comparePassword,
} = require('../../src/services/crypt.service')

const password = 'superpassword'

describe('UNIT TEST: crypt.service', () => {
    it('should hash a password', async () => {
        const hashedPassword = await hashPassword(password)
        expect(hashedPassword).to.be.a('string')
        expect(hashedPassword).to.not.equal(password)
    })

    it('should compare a password', async () => {
        const hashedPassword = await hashPassword(password)
        const same = await comparePassword(password, hashedPassword)
        expect(same).to.be.true
    })
})
