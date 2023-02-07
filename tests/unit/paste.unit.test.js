const { expect } = require('chai')

const { database_connect, database_close } = require('../../src/database')
const pasteService = require('../../src/services/paste.service')
const userService = require('../../src/services/user.service')

const user_payload = {
    username: 'test',
    password: 'test123456',
    email: 'test@gmail.com.py',
}

const paste_payload = {
    title: 'my first tag',
    content: '<h1>test</h1>',
    syntax_highlight: 'html',
    private: false,
}

describe('UNIT TEST: paste.service', () => {
    before(async () => {
        await database_connect()
        const test_user = await userService.create(user_payload)
        user_payload.id = test_user.id
        paste_payload.author = test_user.id
        expect(test_user).to.be.an('object')
    })

    after(async () => {
        await userService.remove(user_payload.id)
        await database_close()
    })

    it('should create a paste', async () => {
        const paste = await pasteService.create(paste_payload)
        paste_payload.id = paste.id
        expect(paste).to.be.an('object')
        expect(paste.title).to.be.equal(paste_payload.title)
    })

    it('should not create a paste without a required field', async () => {
        try {
            new_payload = { ...paste_payload, title: '' }
            await pasteService.create(new_payload)
        } catch (error) {
            expect(error).to.be.an('error')
        }
    })

    it('should find a paste by id', async () => {
        const paste = await pasteService.findById(paste_payload.id)
        expect(paste).to.be.an('object')
        expect(paste.title).to.be.equal(paste_payload.title)
    })

    it('should find a paste by author', async () => {
        const paste = await pasteService.findByAuthor(paste_payload.author)
        expect(paste).to.be.an('array')
        expect(paste.length).to.be.greaterThan(0)
    })

    it('should find all pastes', async () => {
        const pastes = await pasteService.findAll()
        expect(pastes).to.be.an('array')
        expect(pastes.length).to.be.greaterThan(0)
    })

    it('should update a paste', async () => {
        const paste = await pasteService.update({
            id: paste_payload.id,
            title: 'my first amazing paste',
        })
        paste_payload.title = paste.title
        expect(paste).to.be.an('object')
        expect(paste.title).to.be.equal(paste_payload.title)
    })

    it('should not update a paste with invalid data', async () => {
        try {
            await pasteService.update(paste_payload.id, { title: '' })
        } catch (error) {
            expect(error).to.be.an('error')
        }
    })

    it('should remove a paste', async () => {
        const paste = await pasteService.delete(paste_payload.id)
        expect(paste).to.be.an('object')
        expect(paste.title).to.be.equal(paste_payload.title)
    })
})
