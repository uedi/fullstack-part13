const errorHandler = (error, request, response, next) => {
    if( error.name === 'SequelizeValidationError' || error.name === 'SequelizeDatabaseError') {
        return response.status(400).send({ error: 'malformatted data' })
    } else if( error.name === 'TypeError') {
        return response.status(400).send({ error: 'malformatted data or object not found' })
    } else {
        console.log('errorhandler else')
        return response.status(400).end()
    }
}

module.exports = { errorHandler }