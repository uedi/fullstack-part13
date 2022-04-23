require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const main = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection successful')
        sequelize.close()
    } catch (error) {
        console.log('Failed to connect:', error)
    }
}

main()