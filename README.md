# Pastesnip Backend 

Backend for **Pastesnip application** written in GraphQL Yoga and Mongoose.

[![Unit Tests](https://github.com/TeamParches/pastesnip-backend/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/TeamParches/pastesnip-backend/actions/workflows/unit-tests.yml)

## Development 💫
To start developing in this repository you need to do the following steps.

Clone the repository
```bash
git clone https://github.com/TeamParches/pastesnip-backend.git
cd pastesnip-backend
```

Install requirements and run it.
```bash
yarn install
yarn dev
```

To run any test
```
yarn test:unit
yarn test:integration
```

## Environment Variable 📝
Before to run the server you need to define a **.env** file with some required variables, you can check this [example](https://github.com/TeamParches/pastesnip-backend/blob/main/.env.example)

Necessary
- MongoDB URI connection
- Cloudinary access keys
- Email credentials (from google, recommended)



