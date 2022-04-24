const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('../util/config')

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connected to database')
    } catch(error) {
        console.log('Failed to connect to database')
        return process.exit(1)
    }
    return null
}

module.exports = { connectToDatabase, sequelize }