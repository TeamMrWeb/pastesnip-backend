const cloudinary = require('cloudinary').v2
const constants = require('../config').cloudinary

cloudinary.config({
    cloud_name: constants.CLOUD_NAME,
    api_key: constants.API_KEY,
    api_secret: constants.API_SECRET,
})

module.exports = {
    cloudinary_connect: async () => {
        try {
            const result = await cloudinary.api.ping()
            console.info('Cloudinary connection success', result)
        } catch (error) {
            console.error('Error connecting to Cloudinary', error.error)
            throw error
        }
    },
    cloudinary_upload: async (path, folder) => {
        try {
            if (!folder) throw new Error('Folder is required')
            if (!path) throw new Error('Path is required')
            const result = await cloudinary.uploader.upload(path, { folder })
            return result
        } catch (error) {
            console.error('Error uploading to Cloudinary', error.error || error)
            throw error
        }
    },
    cloudinary_remove: async (public_id) => {
        try {
            if (!public_id) throw new Error('Public ID is required')
            const result = await cloudinary.uploader.destroy(public_id)
            return result
        } catch (error) {
            console.error(
                'Error removing file from Cloudinary',
                error.error || error,
            )
            throw error
        }
    },
    cloudinary_get_file: async (public_id) => {
        try {
            if (!public_id) throw new Error('Public ID is required')
            const result = await cloudinary.api.resource(public_id)
            return result
        } catch (error) {
            console.error(
                'Error getting file from Cloudinary',
                error.error || error,
            )
            throw error
        }
    },
}
