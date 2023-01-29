const ejs = require('ejs')
const path = require('path')
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
    send: async ({ to, subject = 'No Subject', template, context = {} }) => {
        try {
            const transporter = await module.exports.create_transporter()
            const template_path = path.join(
                path.resolve(),
                'src',
                'views',
                template,
            )
            const html = await ejs.renderFile(template_path, context)
            const res = await transporter.sendMail({
                from: email.ADDRESS,
                to,
                subject,
                html,
            })
            console.info('Email sent', { to, subject })
            return res
        } catch (error) {
            console.error('Email failed to send', error)
            throw error
        }
    },
}
