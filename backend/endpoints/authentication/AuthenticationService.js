var userService = require('../user/UserService')
var jwt = require('jsonwebtoken')
var config = require('config')

function createSessionToken(userID, password, callback) {
    console.log('AuthenticationService: create Token')

    if (!userID) {
        console.log('Error: No Header')
        callback('Header missing', null, null)
        return
    }

    userService.getUserByID(userID, function (err, user) {
        if (err) {
            return callback(null, null, err, null)
        }
        if (user) {

            console.log('Found user, check the password')

            console.log(JSON.stringify(user))

            user.comparePassword(password, function (err, isMatch) {

                if (isMatch) {
                    console.log('Password is correct. Create Token')

                    var issuedAt = new Date().getTime();
                    var expirationTime = config.get('session.timeout')
                    var expiresAt = issuedAt + (expirationTime * 1000)
                    var privateKey = config.get('session.tokenKey')
                    let token = jwt.sign({userID: user.userID, isAdministrator: user.isAdministrator, userName: user.userName}, privateKey, {
                        expiresIn: expiresAt,
                        algorithm: 'HS256'
                    })
                    console.log('Token created: ' + token)

                    callback(null, null, token)
                }
                else {
                    console.log('Token could not be created')
                    callback(err, null)
                }
            })
        }
        else {
            console.log('Session Service: Did not find user by user ID: ' + userID)
            callback('Did not find user', null)
        }
    })
}

module.exports = {
    createSessionToken
}