const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
const STATUS_CODES = require('http-status-codes')
const jwt = require('jsonwebtoken')
const generator = require('generate-password')

const { EXP_TIME, SECRET } = require('../utils/constants')
const { hashPass } = require('../utils/helpers')
const { simpleHtmlTemplating } = require('../utils/helpers')
const entryLogic = require('../api/entries/logic')

let mailTransporterOptions = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'roscoe.senger@ethereal.email',
        pass: 'kCVKYWTzrRgZYkQ8gv'
    }
}

let newAccountMail = async createdUser => {
    let htmlBody = fs.readFileSync(path.join(__dirname, '..', 'files', 'html-templates', 'newAccountInfo.html'))

    let mailOptions = {
        from: `Solvvo Info <frontdesk@502.ro>`,
        to: createdUser.email,
        subject: '[SOLVVO] Informații cont nou',
        attachments: [{
            filename: 'helpdesk_logo.png',
            path: path.join(__dirname, '..', 'files', 'assets', 'helpdesk_logo.png'),
            cid: 'uniqueLogoSrc'
        }],
        html: simpleHtmlTemplating(htmlBody.toString(), {
            acountName: `${createdUser.firstName} ${createdUser.lastName}`,
            accountEmail: createdUser.email,
            accountPassword: password,
            logoSrc: 'uniqueLogoSrc',
            platformName: 'Solvvo',
            subtitle: 'Accelerating your success | Cloud Services',
            platformLink: 'http://localhost:4200'
        })
    }

    return mailOptions
}

let entrySummaryMail = async () => {
    let date = new Date()

    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)

    let todayEntries = await entryLogic.getAllByDate(date)

    let message = `<table style="border: 1px solid black"> <tr style="color: blue; background-color: aqua"> <th style="margin: 10px">Nume</th> <th>Prenume</th> <th>Email</th> <th>Data intrare</th> <th>Companie</th> <th>Numar telefon </th> </tr>`
    todayEntries.map((item, index) => {
        message = message +
            `<tr style="padding: 5px"> <th>${item.surname}</th> <th>${item.name}</th> <th>${item.email}</th> <th>${item.date.toUTCString()}</th> <th>${item.company}</th> <th>${item.phone}</th> </tr>`
    })
    message = message + "</table>"

    let mailOptions = {
        from: 'Solvvo Info <frontdesk@502.ro>',
        to: 'admin@mail.com',
        subject: "[SOLVVO] Rezumat intrări",
        html: message,
    }

    return mailOptions
}

let resetPasswordMail = async (foundUser, token) => {

    let htmlBody = fs.readFileSync(path.join(__dirname, '..', 'files', 'html-templates', 'resetPassword.html'))

    let mailOptions = {
        from: `Solvvo Info <frontdesk@502.ro>`,
        to: foundUser.email,
        subject: '[SOLVVO] Modificare parolă',
        attachments: [{
            filename: 'helpdesk_logo.png',
            path: path.join(__dirname, '..', 'files', 'assets', 'helpdesk_logo.png'),
            cid: 'uniqueLogoSrc'
        }],
        html: simpleHtmlTemplating(htmlBody.toString(), {
            acountName: `${foundUser.name} ${foundUser.surname}`,
            accountEmail: foundUser.email,
            resetLink: `http://localhost:4200/reset/${token}/${foundUser._id}`,
            logoSrc: 'uniqueLogoSrc',
            platformName: 'Solvvo',
            subtitle: 'Accelerating your success | Cloud Services',
            platformLink: 'http://localhost:4200'
        })
    }

    return mailOptions
}

let sendMail = async (options) => {
    return new Promise(async (resolve, reject) => {
        let transporter = nodemailer.createTransport(mailTransporterOptions)

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
    sendMail,
    sendEntrySummaryEmail: async () => {
        let mailOptions = await entrySummaryMail()
        await sendMail(mailOptions)
    },
    sendResetPasswordEmail: async (email, token) => {
        let mailOptions = await resetPasswordMail(email, token)
        await sendMail(mailOptions)
    },
    sendNewAccountEmail: async createdUser => {
        let mailOptions = await newAccountMail(createdUser)
        await sendMail(mailOptions)
    }
}