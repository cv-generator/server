const User = require('../models/user')
const CV = require('../models/cv')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt')

class userController {
    static register(req, res) {
        const { email, password } = req.body
        User
            .create({
                email,
                password
            })
            .then((createdUser) => {
                res.status(200).json({ message: 'Successfully created a user!', createdUser })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        const { email, password } = req.body
        User
            .findOne({
                email
            })
            .then((findOneUser) => {
                if (!findOneUser) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else if (!compare(password, findOneUser.password)) res.status(401).json({ message: 'Email/Password is incorrect!' })
                else {
                    const { id, first_name, last_name, email } = findOneUser
                    const payload = { id, first_name, last_name, email }
                    const token = sign(payload)
                    req.headers.token = token
                    res.status(200).json({
                        message: 'You have successfully logged in!',
                        token,
                        details: payload
                    })
                }
            })
            .catch((err) => {
                console.log(errj)
                res.status(500).json(err)
            })
    }

    static upload(req, res, next) {
        const { file } = req
        const { gcsUrl, originalname } = file
        if (file && gcsUrl) {
            CV
                .create({
                    url: gcsUrl,
                    UserId: req.authenticatedUser.id
                })
                .then(() => {
                    res.status(201).json({
                        message: `Successfully uploaded to the cloud!`,
                        url: `${gcsUrl}`,
                        file: `${originalname}`
                    })
                })
                .catch((err) => {
                    res.status(500).json(err.message)
                })
        } else res.status(500).json({ message: 'Unable to upload!' })
    }
}

module.exports = userController