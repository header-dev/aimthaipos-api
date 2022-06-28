const expressJwt = require("express-jwt")
const env = require('../config/env')

const jwt = () => {
    const secretKey = process.env.TOKEN_SECRET

    return expressJwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
        path: [
            '/api/v1/authen/login',
            '/api/v1/user/create',
            '/api/v1/image'
        ]
    })
}

module.exports = jwt