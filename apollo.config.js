module.exports = {
    client: {
        service: {
            name: 'tauro-finance',
            url: "https://dominant-stag-27.hasura.app/v1/graphql"
        },
        includes: [
            'src/**/*.vue',
            'src/**/*.js'
        ]
    }
}