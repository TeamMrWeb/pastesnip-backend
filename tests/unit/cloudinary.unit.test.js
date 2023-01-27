const { expect } = require('chai')
const {
    cloudinary_upload,
    cloudinary_remove,
    cloudinary_get_file,
} = require('../../src/services/cloudinary.service')

// setting up
const file_payload = {
    public_id: null,
    secure_url: null,
    local_path: 'tests/resources/kitty.jpg',
    dest_folder: 'test',
}

describe('UNIT TEST: cloudinary.service', () => {
    it('should upload a file', async () => {
        const result = await cloudinary_upload(
            file_payload.local_path,
            file_payload.dest_folder,
        )
        file_payload.public_id = result.public_id
        file_payload.secure_url = result.secure_url
        expect(result).to.be.an('object')
    })

    it('should not upload a inexistent path file', async () => {
        try {
            await cloudinary_upload(
                'tests/resources/kitty2.jpg',
                file_payload.dest_folder,
            )
        } catch (error) {
            expect(error).to.be.an('object')
        }
    })

    it('should get a file', async () => {
        const result = await cloudinary_get_file(file_payload.public_id)
        expect(result).to.be.an('object')
    })

    it('should not get a inexistent file', async () => {
        try {
            await cloudinary_get_file('inexistent')
        } catch (error) {
            expect(error).to.be.an('object')
        }
    })

    it('should delete a file', async () => {
        const result = await cloudinary_remove(
            file_payload.public_id,
            file_payload.dest_folder,
        )
        expect(result).to.be.an('object')
    })

    it('should not delete a inexistent file', async () => {
        try {
            await cloudinary_remove('inexistent', file_payload.dest_folder)
        } catch (error) {
            expect(error).to.be.an('object')
        }
    })
})
