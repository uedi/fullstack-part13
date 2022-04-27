const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')) {
        try {
            const token = jwt.verify(authorization.substring(7), SECRET)
            const session = await Session.findOne({ where: { token: authorization.substring(7) }})
            const user = await User.findByPk(token.id)
            if(user.disabled) {
                return res.status(401).json({ error: 'account disabled'})
            } else if(!session) {
                return res.status(401).json({ error: 'token expired'})
            }
            req.decodedToken = token
        } catch (error) {
            return res.status(401).json({ error: 'invalid token' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if( error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
        return response.status(400).send({ error: error.message || 'malformatted data' })
    } else if( error.name === 'TypeError') {
        return response.status(400).send({ error: 'malformatted data or object not found' })
    } else {
        console.log('errorhandler else')
        return response.status(400).end()
    }
}

module.exports = { errorHandler, tokenExtractor }