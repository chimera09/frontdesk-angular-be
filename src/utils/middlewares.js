const { getById } = require('../api/users/logic')
const jwt = require('jsonwebtoken')
const STATUS_CODES = require('http-status-codes')

module.exports = {
    authHandler: async (req, res, next) => {
        let auth = req.headers.authorization

        if (auth !== undefined) {

            [bearer, token] = auth.split(' ')
            let decoded

            try {
                decoded = jwt.decode(token)
                req.auth = decoded
            } catch (err) {
                res.send(err)
            }

            let user = await getById(decoded._id)

            if (user !== null)
                next()
            else res.send('User not found')
        }
        else {
            res.send('Not logged in')
        }
    },
    notFoundHandler: (req, res, next) => {
        let error = new Error()
        error.status = STATUS_CODES.NOT_FOUND

        next(error)
    },
    errorHandler: (err, req, res, next) => {
        console.error(err)

        if (err.status) return res.status(err.status).json({ message: err.message })

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ ...err })
    },
}