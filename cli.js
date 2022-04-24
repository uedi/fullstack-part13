require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const printBlog = (blog) => {
    const text = `${blog.author ? blog.author : ''}: '${blog.title}', ${blog.likes} likes`
    console.log(text)
}

const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query('SELECT * FROM blogs', { type: QueryTypes.SELECT })
        if(blogs) {
            blogs.forEach(blog => {
                printBlog(blog)
            })
        } else {
            console.log('No blogs')
        }
        sequelize.close()
    } catch (error) {
        console.log('Failed to connect to database:', error)
    }
}

main()