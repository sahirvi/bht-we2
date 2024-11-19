var express = require('express')
var router = express.Router()
var authenticationService = require('./AuthenticationService')

router.post("/", function (req, res, next) {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"')
        return res.json({ message: 'Missing Authorization Header!' })
    }

    else {
        const base64Credentials = req.headers.authorization.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
        const [userID, password] = credentials.split(':')

        console.log('Want to create a token')

        authenticationService.createSessionToken(userID, password, function (err, err, token) {
            if (token) {
                console.log('RESPONSE: ' + res.userID)
                res.header('Authorization', 'Bearer ' + token)
                res.status(200).send('Authentication successful')
            }

            else {
                console.log('Token has not been created, Error: ' + err)
                res.status(401).send('Could not create Token')
            }
        })
    }

})

module.exports = router