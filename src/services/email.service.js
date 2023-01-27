const nodemailer = require('nodemailer')
const { email } = require('../config')

module.exports = {
    create_transporter: (address, password) =>
        nodemailer.createTransport({
            service: email.SERVICE,
            auth: {
                user: address || email.ADDRESS,
                pass: password || email.PASSWORD,
            },
        }),
    check_credentials: async (address, password) => {
        try {
            const res = await module.exports
                .create_transporter(address, password)
                .verify()
            console.info('Email credentials established', {
                address: address || email.ADDRESS,
            })
            return res
        } catch (error) {
            console.error('Email credentials are invalid', error.response)
            throw error
        }
    },
    send: async ({
        to,
        subject = 'No Subject',
        text = 'No Text',
        html = 'No HTML',
    }) => {
        try {
            const transporter = await module.exports.create_transporter()
            const mailOptions = {
                from: email.ADDRESS,
                to,
                subject,
                text,
                html,
            }
            const res = await transporter.sendMail(mailOptions)
            console.info('Email sent', mailOptions)
            return res
        } catch (error) {
            console.error('Email failed to send', error)
            throw error
        }
    },
}
