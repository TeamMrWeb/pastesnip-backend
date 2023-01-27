const { mergeTypeDefs } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { join } = require('path')

module.exports = mergeTypeDefs(
    loadFilesSync(join(__dirname, '.'), {
        extensions: ['gql'],
    }),
)
