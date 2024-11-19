const Forum = require('./ForumModel')


/* CREATE */
function createForum(req, callback) {
    console.log('DER OWNER IST: ' + req.tokenData.user)
    let newForum = new Forum({ ownerID: req.userID })
    Object.assign(newForum, req.body)
    newForum.save(function (err, result) {
        if (err) {
            console.log('forum not added: ' + err)
            return callback(err, null)
        }
        else {
            console.log('forum added: ' + newForum)
            return callback(null, result)
        }
    })
}


/* GET (AN FORUM BY ID) */
function getForumByID(id, callback) {
    Forum.findOne({ _id: id }, function (err, result) {
        if (result != null) {
            console.log('forum found: ' + result)
            return callback(null, result)
        }
        else {
            console.log('forum not found')
            return callback(err, null)
        }
    })
}


/* GET (AN FORUM BY OWNERID) */
function getForumByOwnerID(ownerID, callback) {
    Forum.find({ ownerID: ownerID }, function (err, result) {
        if (ownerID != null) {
            console.log('forum found: ' + result)
            return callback(null, result)
        }
        else {
            console.log('forum not found')
            return callback(err, null)
        }
    })
}


/* READ (ALL FORUMS) */
function getForums(callback) {
    Forum.find(function (err, result) {
        if (err) {
            console.log('forums found')
            return callback(err, null)
        }
        else {
            console.log('forums not found')
            return callback(null, result)
        }
    })
}


/* UPDATE */
function updateForum(id, props, callback) {
    getForumByID(id, function (err, forum) {
        if (forum) {
            Object.assign(forum, props)
            forum.save(function (err, result) {
                if (err) {
                    console.log(props + 'forum could not be updated')
                    return callback(err, null)
                }
                else {
                    console.log('forum updated: ' + result)
                    return callback(null, result)
                }
            })
        }
        else {
            console.log('forum not found')
            return callback(err, null)
        }
    })
}


/* DELETE */
function deleteForum(id, callback) {
    getForumByID(id, function (err, result) {
        if (id) {
            try {
                result.remove()
                console.log('forum deleted: ' + result)
                return callback(null, result)
            }
            catch (err) {
                console.log('forum could not be deleted: ' + err)
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
    createForum,
    getForumByID,
    getForumByOwnerID,
    updateForum,
    deleteForum,
    getForums,
}