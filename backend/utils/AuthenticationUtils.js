const config = require('config')
var jwt = require('jsonwebtoken')
var atob = require('atob')
var userService = require('.././endpoints/user/UserService')

function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(' ')[1]
        var privateKey = config.get('session.tokenKey')
        jwt.verify(token, privateKey, { algorithm: 'HS256' }, (err, user) => {
            if (err) {
                res.status(500).json({ error: 'Internal Server Error' })
                return
            }
            console.log('Token is valid')

            var payload = JSON.parse(atob(token.split('.')[1]))
            req.tokenData = payload
            req.userID = payload.userID

            console.log('TokenData: ' + JSON.stringify(payload))
            console.log('UserID: ' + req.userID)
            return next()
        })
    } else {
        res.status(401).json({ error: 'Not Authorized' })
        return;
    }
}

function isAdmin(req, res, next) {
    userService.getUserByID(req.tokenData.userID, function (err, user) {
        if (user.isAdministrator === true) {
            return next()
        }
        else {
            res.status(406).json({ error: 'you are not administrator' })
        }
    })
}


module.exports = {
    isAuthenticated,
    isAdmin,
}