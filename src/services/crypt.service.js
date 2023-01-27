const { hash, compare } = require('bcrypt')
const saltRounds = 10

module.exports = {
    hashPassword: async (password) => await hash(password, saltRounds),
    comparePassword: async (password, hash) => await compare(password, hash),
}
