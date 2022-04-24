const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    if(req.blog) {
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)    
        return res.json(blog)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

router.delete('/:id', blogFinder, async (req, res) => {
    if(req.blog) {
        await req.blog.destroy()
    }
    res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
    if(!req.body?.likes || isNaN(req.body.likes)) {
        return res.status(400).json({ error: 'missing parameter likes or invalid parameter likes' })
    } else if(req.blog) {
        req.blog.likes = req.body.likes        
        await req.blog.save()
        return res.json(req.blog)
    } else {
        return res.status(404).end()
    }
})

module.exports = router