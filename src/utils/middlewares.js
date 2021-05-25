const { getById } = require('../api/users/logic')
const jwt = require('jsonwebtoken')

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
            res.send("Not logged")
        }
    }
}