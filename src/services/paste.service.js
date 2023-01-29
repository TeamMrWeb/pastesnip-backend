const { models } = require('../database')
const { Paste } = models

module.exports = {
    create: async (paste) => await Paste.create(paste)
}