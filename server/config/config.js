require('dotenv').config(
  {
    path: "../.env"
  }
)

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "www",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
}