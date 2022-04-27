const router = require('express').Router()
const { Blog, User, Readinglist } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
    let readinglist = await Readinglist.findOne({
        where: {
            blogId: req.body.blog_id,
            userId: req.body.user_id
        }
    })
    if(!readinglist) {
        readinglist = await Readinglist.create({
            blogId: req.body.blog_id,
            userId: req.body.user_id
        })
    }
    res.json(readinglist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
    const readinglist = await Readinglist.findByPk(req.params.id)

    if(!readinglist) {
        return res.status(404).end()
    } else if(readinglist.userId !== req.decodedToken.id) {
        return res.status(403).end()
    }

    readinglist.read = req.body.read
    await readinglist.save()

    return res.json(readinglist)
})

module.exports = router