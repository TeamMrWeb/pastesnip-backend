const { models } = require('../database')
const { Token } = models

module.exports = {
    create: async (payload) => await Token.create(payload),
    delete: async (options) => await Token.deleteOne(options),
    deleteMany: async (options) => await Token.deleteMany(options),
    find: async (options) => await Token.findOne(options),
}
