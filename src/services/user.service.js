const { models } = require('../database')
const { User } = models

module.exports = {
    create: async (user_payload) => await User.create(user_payload),
    findAll: async () => await User.find(),
}
