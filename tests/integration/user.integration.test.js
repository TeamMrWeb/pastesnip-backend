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

        // simple request to get the access token
        const res = await chai
            .request(app)
            .post('/graphql')
            .send({
                query: `mutation { loginUser(
                    email: "${user_payload.email}", password: "${user_payload.password}")
                    { access } 
                }`,
            })
        user_payload.access_token = res.body.data.loginUser.access
    })

    after(async () => {
        await database_close()
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
        it('should return a user by id', async () => {
            const query = `query { getUserById(id: "${user_payload.id}") { id username email } }`
            const res = await chai
                .request(app)
                .post('/graphql')
                .set('auth', user_payload.access_token)
                .send({ query })
            const data = res.body.data.getUserById
            expect(res).to.have.status(200)
            expect(data).to.be.an('object')
            expect(data.id).to.be.equal(user_payload.id)
            expect(data.username).to.be.equal(user_payload.username)
            expect(data.email).to.be.equal(user_payload.email)
        })
    })

    describe('MUTATION', () => {
        // createNewUser is not tested for now
        it('should create a new user', async () => {})
        it('should update a user', async () => {
            const res = await chai
                .request(app)
                .post('/graphql')
                .set('auth', user_payload.access_token)
                .send({
                    query: `mutation { updateUser(
                    id: "${user_payload.id}", username: "testing2", about: "testing about")
                    { id username email about }
                }`,
                })
            const data = res.body.data.updateUser
            console.log(data)
            expect(res).to.have.status(200)
            expect(data).to.be.an('object')
            expect(data.id).to.be.equal(user_payload.id)
            expect(data.username).to.be.equal('testing2')
            expect(data.email).to.be.equal(user_payload.email)
            expect(data.about).to.be.equal('testing about')
        })
        it('should cannot delete a another admin user', async () => {
            const res = await chai
                .request(app)
                .post('/graphql')
                .set('auth', user_payload.access_token)
                .send({
                    query: `mutation { deleteUser(id: "${user_payload.id}") }`,
                })
            const data = res.body.data
            console.log(data)
            expect(res).to.have.status(200)
        })
        it('should delete a user', async () => {
            // change role to user because an admin cannot delete another admin (for now)
            await userService.update({ id: user_payload.id, role: 'user' })
            const res = await chai
                .request(app)
                .post('/graphql')
                .set('auth', user_payload.access_token)
                .send({
                    query: `mutation { deleteUser(id: "${user_payload.id}") }`,
                })
            const data = res.body.data.deleteUser
            expect(res).to.have.status(200)
            expect(data).to.be.equal('User deleted successfully')
        })
    })
})
