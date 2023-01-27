const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../../src/index')

// setting up for send http requests and assertions
chai.use(chaiHttp)
const { expect } = chai

describe('INTEGRATION TEST: User', () => {
    before(async () => {
        await app
    })

    describe('QUERY', () => {
        it('should return all users', async () => {
            const query = ` query { users { id username email } } `
            const res = await chai.request(app).post('/graphql').send({ query })
            const users = res.body.data.users
            expect(res).to.have.status(200)
            expect(users).to.be.an('array')
        })
    })
})
