const router = require('express').Router()
const { Session } = require('../models')

router.delete('/', async (req, res) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        await Session.destroy({
            where: {
                token: authorization.substring(7)
            }
        })
    }
    res.status(204).end()
})

module.exports = router