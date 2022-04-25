const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        group: 'author',
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('title')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
        ],
        where: {
            author: {
                [Op.not]: null
            }
        }
    })
    res.json(authors)
})

module.exports = router