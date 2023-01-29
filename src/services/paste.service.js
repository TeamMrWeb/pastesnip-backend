const { models } = require('../database')
const { Paste } = models

module.exports = {
    create: async (paste_payload) => await Paste.create(paste_payload),
}
