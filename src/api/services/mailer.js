const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const moment = require('moment')

let mailTransporterOptions = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'roscoe.senger@ethereal.email',
        pass: 'kCVKYWTzrRgZYkQ8gv'
    }
}

let sendMail = async (options) => {
    return new Promise(async (resolve, reject) => {
        let transporter = nodemailer.sendMail({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'roscoe.senger@ethereal.email',
                pass: 'kCVKYWTzrRgZYkQ8gv'
            }
        })

        transporter.sendMail({
            ...options
        }, (error, info) => {
            if (error) {
                transporter.close()
                reject(error)
            } else {
                transporter.close()
                resolve(info)
            }
        })
    })
}

module.exports = {
    sendMail
}