const { models } = require('../database')
const { User } = models

module.exports = {
    create: async (user_payload) => await User.create(user_payload),
    remove: async (id) => await User.findByIdAndRemove(id),
    findAll: async () => await User.find(),
}
