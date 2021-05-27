const express = require('express')
const router = express.Router()
const logic = require('./logic')
const wrap = require('express-async-wrap')
const { validationResult } = require('express-validator')

const { checkLogin } = require('../../utils/validation/auth')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post(checkLogin, (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.login(req.body.username, req.body.password).then(resp => {
            if(resp.token) {
                res.json(resp)
            }
            else 
                res.status(401).json(resp)
        })
        .catch(err =>{
            res.status(404).json(err)
        })
    })

router.route('/recover')
    .put(wrap((req, res) => logic.recover(req.body.email)
        .then(result => res.send(result))))

router.route('/reset/:TOKEN/:ID')
    .post(wrap((req, res) => logic.resetPassword(req.params.ID, req.params.TOKEN, req.body.newPass)
        .then(result => res.send(result))))

module.exports = router