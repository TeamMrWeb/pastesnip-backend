const { expect } = require('chai')
const { check_credentials, send } = require('../../src/services/email.service')

const send_emails = false
const receiver = ''
const html = '<h1>Test</h1>'

describe('UNIT TEST: email.service', () => {
    it('should check invalid credentials', async () => {
        try {
            await check_credentials('invalid', 'invalid')
        } catch (err) {
            expect(err).to.be.an('error')
        }
    })

    it('should check valid credentials', async () => {
        // This test will fail if you don't have a valid email account in your .env file
        const res = await check_credentials()
        expect(res).to.be.true
    })

    if (send_emails) {
        it('should send an email', async () => {
            const res = await send({
                to: receiver,
                subject: 'Unit Test',
                text: 'This is a unit test',
            })
            expect(res).to.be.an('object')
            expect(res).to.have.property('accepted')
        })

        it('should send an email with html', async () => {
            const res = await send({
                to: receiver,
                subject: 'Unit Test',
                html,
            })
            expect(res).to.be.an('object')
            expect(res).to.have.property('accepted')
        })
    }
})
