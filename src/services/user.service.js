const { models } = require('../database')
const { User } = models

module.exports = {
    create: async (user_payload) => await User.create(user_payload),
    remove: async (id) => await User.findByIdAndRemove(id),
    find: async (options) => await User.findOne(options),
    findAll: async () => await User.find(),
    findById: async (id) => await User.findById(id),
    findByEmail: async (email) => module.exports.find({ email }),
}
