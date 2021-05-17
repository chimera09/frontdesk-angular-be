const express = require('express')
const router = express.Router()
const logic = require('./logic')
const { validationResult } = require('express-validator')
const { checkEntries } = require('../../utils/validation/entries')
const Helpers = require('../../utils/helpers')
const { StatusCodes } = require('http-status-codes')

router.route('/')
    .post(checkEntries, (req,res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty())
            res.json(Helpers.handleResponse(errors, StatusCodes.UNPROCESSABLE_ENTITY))
        else logic.create(req.body.entry).then(entry => {
            res.json(entry)
        }).catch(err => {
            res.send(err)
        })
    })

    .get((req, res) => {
        logic.getAll(req.query.from, req.query.limit).then(response => {
            res.json(response)
        }).catch(err => {
            res.send(err)
        })
    })

router.route('/:ID')
    .delete((req, res) =>{
        logic.delete(req.params.ID).then(entry =>{
            res.send(entry)
        })
    })
    .put((req, res) =>{
        logic.update(req.params.ID, req.body).then(entry =>{
            res.send(entry)
         })
    })
    
module.exports = router