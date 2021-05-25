const express = require('express')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { checkLogin } = require('../../utils/validation/auth')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post((req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.login(req.body.username, req.body.password).then(resp => {
            if(resp.token) {
                req.session.user = req.body.username
            }
            res.json(resp)
        })
        .catch(err =>{
            res.status(404).json(err)
        })
    })

module.exports = router