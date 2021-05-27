const express = require('express')
const router = express.Router()
const logic = require('./logic')
const wrap = require('express-async-wrap')
const { validationResult } = require('express-validator')

const { checkRegister } = require('../../utils/validation/users')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post(checkRegister, (req, res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.create(req.body.user).then(user => {
            res.json(user)   
        }).catch(err => {
            res.send(err)
        })  
    })
    .get((req,res) => {
        logic.getAll().then(users => {
            res.json(users)
        }).catch(err => {
            res.send(err)
        })
    })

router.route('/:ID')
    .get((req,res) => {
        logic.getById(req.params.ID).then(user => {
            res.json(user)
        }).catch(err => {
            res.status(400)
            res.send(err)
        })
    })
    .put((req, res) => {
        logic.update(req.params.ID, req.body).then(user => {
            res.json(user)
        }).catch(err => {
            res.status(400)
            res.send(err)
        })
    })

module.exports = router