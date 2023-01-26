const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    global: {
        PORT: process.env.PORT || 3000,
        PROTOCOL: process.env.PROTOCOL || 'http',
        DOMAIN: process.env.DOMAIN || 'localhost',
        MODE: process.env.NODE_ENV.trim(),
    },
    database: {
        URI: process.env.DATABASE_URI,
        OPTIONS: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
    },
    jwt: {
        ACCESS_TOKEN: {
            SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
            EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
        REFRESH_TOKEN: {
            SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
            EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
        EMAIL_VERIFICATION: {
            SECRET: process.env.JWT_EMAIL_VERIFICATION_SECRET,
            EXPIRES_IN: process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
        },
    },
    email: {
        EMAIL: {
            USER: process.env.EMAIL_USER,
            PASSWORD: process.env.EMAIL_PASSWORD,
            ADDRESS: process.env.EMAIL_ADDRESS,
        },
    },
    cloudinary: {
        TEMP_FOLDER: process.env.CLOUDINARY_TEMP_FOLDER || 'temp',
        CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        API_KEY: process.env.CLOUDINARY_API_KEY,
        API_SECRET: process.env.CLOUDINARY_API_SECRET,
        // AVATAR_FOLDER: process.env.CLOUDINARY_AVATAR_FOLDER,
    },
}
