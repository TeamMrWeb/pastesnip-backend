const { expect } = require('chai')

const { database_connect, database_close } = require('../../src/database')
const userService = require('../../src/services/user.service')

const user_payload = {
    username: 'test',
    password: 'test123456',
    email: 'test@gmail.com.py',
}

describe('UNIT TEST: user.service', () => {
    before(async () => {
        await database_connect()
    })

    after(async () => {
        await database_close()
    })

    it('should create a user', async () => {
        const user = await userService.create(user_payload)
        // save the new user id to use it in the next tests
        user_payload.id = user.toJSON().id
        expect(user).to.be.an('object')
    })

    it('should not create a user with an existing username', async () => {
        try {
            new_payload = { ...user_payload, email: 'test2@gmail.com.py' }
            await userService.create(new_payload)
        } catch (error) {
            expect(error).to.be.an('error')
        }
    })

    it('should not create a user with an less than 6 characters password', async () => {
        try {
            new_payload = { ...user_payload, password: 'test' }
            await userService.create(new_payload)
        } catch (error) {
            expect(error).to.be.an('error')
        }
    })

    it('should not create a user with an existing email', async () => {
        try {
            new_payload = { ...user_payload, username: 'test2' }
            await userService.create(new_payload)
        } catch (error) {
            expect(error).to.be.an('error')
        }
    })

    it('should not creqate a user with invalid email', async () => {
        try {
            new_payload = { ...user_payload, email: 'yesir' }
            await userService.create(new_payload)
        } catch (error) {
            expect(error).to.be.an('error')
        }
    })

    it('should return all users', async () => {
        const users = await userService.findAll()
        expect(users).to.be.an('array')
        expect(users.length).to.be.greaterThan(0)
    })

    it('should remove a user by id', async () => {
        const user = await userService.remove(user_payload.id)
        expect(user).to.be.an('object')
    })
})
