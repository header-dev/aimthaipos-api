const env = {
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    dialect: process.env.DB_DIALECT
}

module.exports = env