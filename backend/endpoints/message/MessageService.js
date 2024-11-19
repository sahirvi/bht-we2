const Message = require('./MessageModel')
const Forum = require('../forum/ForumModel')


/* CREATE */
function createMessage(req, callback) {
    Forum.findOne({ _id: req.body.forumID }, function (err, result) {
        if (result) {
            console.log('forum with forumID: ' + req.body.forumID + ' found')
            let newMessage = new Message({ authorID: req.userID })
            Object.assign(newMessage, req.body)
            newMessage.save(function (err, result) {
                if (result) {
                    console.log('message added: ' + newMessage)
                    return callback(null, result)
                }
                else {
                    console.log('message not added: ' + err)
                    return callback(err, null)   
                }
            })
        }
        else {
            console.log('error finding forum')
            return callback(err, null)
        }
   })

}


/* GET (AN MESSAGE BY ID) */
function getMessageByID(id, callback) {
    Message.findOne({ _id: id }, function (err, result) {
        if (result != null) {
            console.log('message found: ' + result)
            return callback(null, result)
        }
        else {
            console.log('message not found')
            return callback(err, null)
        }
    })
}


/* GET (AN MESSAGE BY AUTHORID) */
function getMessageByAuthorID(authorID, callback) {
    Message.find({ authorID: authorID }, function (err, result) {
        if (authorID != null) {
            console.log('message found: ' + result)
            return callback(null, result)
        }
        else {
            console.log('message not found')
            return callback(err, null)

        }
    })
}


/* GET (AN MESSAGE BY FORUMID) */
function getMessageByForumID(forumID, callback) {
    Message.find({ forumID: forumID }, function (err, result) {
        if (forumID != null) {
            console.log('message found: ' + result)
            return callback(null, result)
        }
        else {
            console.log('message not found')
            return callback(err, null)
        }
    })
}


/* READ (ALL MESSAGES) */
function getMessages(callback) {
    Message.find(function (err, result) {
        if (err) {
            console.log('messages found')
            return callback(err, null)
        }
        else {
            console.log('messages not found')
            return callback(null, result)
        }
    })
}


/* UPDATE */
function updateMessage(id, props, callback) {
    getMessageByID(id, function (err, message) {
        if (message) {
            Object.assign(message, props)
            message.save(function (err, result) {
                if (err) {
                    console.log(props + 'message could not be updated')
                    return callback(err, null)
                }
                else {
                    console.log('message updated: ' + result)
                    return callback(null, result)
                }
            })
        }
        else {
            console.log('message not found')
            return callback(err, null)
        }
    })
}


/* DELETE */
function deleteMessage(id, callback) {
    getMessageByID(id, function (err, result) {
        if (id) {
            try {
                result.remove()
                console.log('message deleted: ' + result)
                return callback(null, result)
            }
            catch (err) {
                console.log('message could not be deleted: ' + err)
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
    createMessage,
    getMessageByID,
    getMessageByAuthorID,
    getMessageByForumID,
    getMessages,
    updateMessage,
    deleteMessage,
}