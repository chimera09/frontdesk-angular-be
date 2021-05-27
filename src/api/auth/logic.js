const database = require('../users/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generator = require('generate-password')
const { StatusCodes } = require('http-status-codes')

const userLogic = require('../users/logic')
const userDatabase = require('../users/database')
const { MESSAGES: { USER_NOT_FOUND, AUTH_SUCCESS, INCORRECT_PASS }, EXP_TIME, SECRET } = require('../../utils/constants')
const Helpers = require('../../utils/helpers')
const mailer = require('../../services/mailer')

module.exports = {
    login: async (username, password) => {
        const userFound = await database.getByEmail(username)
        if (userFound === null) {
            return Helpers.handleResponse(USER_NOT_FOUND, StatusCodes.FORBIDDEN)
        }
        else if (bcrypt.compareSync(password, userFound.password)) {
            const token = jwt.sign({
                _id: userFound._id,
                name: userFound.name,
                surname: userFound.surname,
                email: userFound.email,
                phone: userFound.phone,
                role: userFound.role,
            }, SECRET, { expiresIn: EXP_TIME })

            return { role: userFound.role, token }
        }
        else {
            return Helpers.handleResponse(INCORRECT_PASS, StatusCodes.FORBIDDEN)
        }
    },
    recover: async email => {
        let user = await userLogic.getByEmail(email)

        if (!user) {
            let error = new Error('User not found')
            error.status = StatusCodes.NOT_FOUND

            throw error
        }

        let token = jwt.sign({
            _id: user._id,
            email: user.email
        }, SECRET, { expiresIn: EXP_TIME })

        await mailer.sendResetPasswordEmail(user, token)
    },
    resetPassword: async (id, token, password) => {
        let hashedPass = Helpers.hashPass(password)
        try {
            jwt.verify(token, SECRET)
        } catch (err) {
            err.status = StatusCodes.UNAUTHORIZED
            err.message = 'Invalid/Expired token'

            throw err
        }
        return await userDatabase.getByIdAndUpdate(id, hashedPass.toString())
    },
}
