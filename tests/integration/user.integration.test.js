const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/index')
const { database_connect, database_close } = require('../../src/database')

// import user services
const userService = require('../../src/services/user.service')
let user_payload = {
    access_token: '',
    username: 'testing',
    password: 'testing123456',
    email: 'testing@gmail.com',
    role: 'admin',
    verified: true,
}

// setting up for send http requests and assertions
chai.use(chaiHttp)
const { expect } = chai

describe('INTEGRATION TEST: User', () => {
    before(async () => {
        await database_connect()
        const response = await userService.create(user_payload)
        if (!response) throw new Error('Error creating user for testing')
        user_payload = { ...user_payload, id: response.id }
        await app
    })

    after(async () => {
        const response = await userService.remove(user_payload.id)
        if (!response) throw new Error('Error removing user for testing')
        await database_close()
    })

    describe('MUTATION', () => {
        it('should login a user', async () => {
            const query = `mutation { loginUser(
                email: "${user_payload.email}",
                password: "${user_payload.password}")
                { access refresh }
            }`
            const res = await chai.request(app).post('/graphql').send({ query })
            user_payload.access_token = res.body.data.loginUser.access
            expect(res).to.have.status(200)
            expect(res.body.data.loginUser).to.be.an('object')
        })

        it('should not login a user with invalid email', async () => {
            const query = `mutation { loginUser(
                email: "yesir",
                password: "${user_payload.password}")
                { access refresh }
            }`
            const res = await chai.request(app).post('/graphql').send({ query })
            const error = res.body.errors[0].message
            expect(res).to.have.status(200)
            expect(error).to.be.equal('Internal Server Error')
        })
    })

    describe('QUERY', () => {
        it('should identify a user using me', async () => {
            const query = `query { me { id username email } }`
            const res = await chai
                .request(app)
                .post('/graphql')
                .set('auth', user_payload.access_token)
                .send({ query })
            const data = res.body.data.me
            expect(res).to.have.status(200)
            expect(data).to.be.an('object')
            expect(data.id).to.be.equal(user_payload.id)
            expect(data.username).to.be.equal(user_payload.username)
            expect(data.email).to.be.equal(user_payload.email)
        })
        it('should return all users', async () => {
            const query = ` query { users { id username email } } `
            const res = await chai
                .request(app)
                .post('/graphql')
                .set('auth', user_payload.access_token)
                .send({ query })
            const users = res.body.data.users
            expect(res).to.have.status(200)
            expect(users).to.be.an('array')
        })
    })
})
