const { expect } = require('chai')
const { check_credentials, send } = require('../../src/services/email.service')

const send_emails = false
const receiver = ''

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
        it('should send an email verification', async () => {
            const res = await send({
                to: receiver,
                subject: 'Verify your account (TEST)',
                template: 'email-verification.ejs',
                context: {
                    title: 'Email verification',
                    name: 'Super Tester',
                    message:
                        'Please verify your email address by clicking the button below.',
                    link: 'www.google.com,',
                },
            })
            expect(res).to.be.an('object')
            expect(res).to.have.property('accepted')
        })
    }
})
