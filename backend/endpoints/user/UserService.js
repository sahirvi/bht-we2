const User = require('./UserModel')


/* CREATE */
function createUser(data, callback) {
    let newUser = new User(data)
    newUser.save(function (err, result) {
        if (err) {
            console.log('user not added: ' + err)
            return callback(err, null)
        }
        else {
            console.log('user added: ' + newUser)
            return callback(null, result)
        }
    })
}


/* GET (AN USER BY ID) */
function getUserByID(userID, callback) {
    User.findOne({ userID: userID }, function (err, result) {
        if (userID != null) {
            console.log('User found: ' + result)
            return callback(null, result)
        }
        else {
            console.log('User not found')
            return callback(err, null)

        }
    })
}


/* READ (ALL USERS) */
function getUsers(callback) {
    User.find(function (err, result) {
        if (err) {
            console.log('Users not found')
            return callback(err, null)
        }
        else {
            console.log('Users found')
            return callback(null, result)
        }
    })
}


/* UPDATE */
function updateUser(id, props, callback) {
    getUserByID(id, function (err, user) {
        if (user) {
            Object.assign(user, props)
            user.save(function (err, result) {
                if (err) {
                    console.log(props + 'user could not be updated')
                    return callback(err, null)
                }
                else {
                    console.log('user updated: ' + result)
                    return callback(null, result)
                }
            })
        }
        else {
            console.log('user not found')
            return callback(err, null)
        }
    })
}


/* DELETE */
function deleteUser(id, callback) {
    getUserByID(id, function (err, result) {
        if (id) {
            try {
                result.remove()
                console.log('user deleted: ' + result)
                return callback(null, result)
            }
            catch (err) {
                console.log('user could not be deleted: ' + err)
                return callback(err, null)
            }
        }
        else {
            console.log('ID not found')
            return callback(err, null)
        }
    })
}


module.exports = {
    createUser,
    getUserByID,
    updateUser,
    deleteUser,
    getUsers,
}