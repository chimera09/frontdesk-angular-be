const database = require('../users/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { MESSAGES: { USER_NOT_FOUND, AUTH_SUCCESS, INCORRECT_PASS } } = require('../../utils/constants')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

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
            }, 'secret', { expiresIn: '2h' })

            return { role: userFound.role, token }
        }
        else {
            return Helpers.handleResponse(INCORRECT_PASS, StatusCodes.FORBIDDEN)
        }
    }
}
