var express = require('express')
var router = express.Router()
var messageService = require('./MessageService')
var AuthenticationUtils = require('../../utils/AuthenticationUtils')


/* CREATE */
router.post('/', AuthenticationUtils.isAuthenticated, function (req, res, next) {
    console.log(req.body);
    messageService.createMessage(req, function (err, message) {
        if (message) {
            res.status(200).send(message)
        }
        else {
            res.status(400).send('message could not be added: ' + err)
        }
    })
})


/* GET BY FORUMID */
router.post('/getByForumID', AuthenticationUtils.isAuthenticated, function (req, res, next) {
    console.log(req.body);
    messageService.getMessageByForumID(req.body.forumID, function (err, messages) {
        if (messages) {
            res.status(200).send(Object.values(messages))
        }
        else {
            res.status(404).send('message could not be found: ' + err)
        }
    })
})


/* GET BY AUTHORID (TOKEN) */
router.get('/getByAuthorID', AuthenticationUtils.isAuthenticated, function (req, res, next) {
    console.log(req.body)
    messageService.getMessageByAuthorID(req.tokenData.user, function (err, messages) {
        if (messages) {
            res.status(200).send(Object.values(messages))
        }
        else {
            res.status(404).send('message could not be found: ' + err)
        }
    })
})


/* READ ALL MESSAGES */
router.get('/', function (req, res, next) {
    console.log(req.body)
    messageService.getMessages(function (err, messages) {
        if (messages) {
            res.status(200).send(Object.values(messages))
        }
        else {
            res.status(404).send('messages could not be found: ' + err)
        }
    })
})


/* UPDATE */
router.put('/', AuthenticationUtils.isAuthenticated, function (req, res) {
    console.log(req.body)
    let props = req.body
    messageService.updateMessage(req.body._id, props, function (err, message) {
        if (message) {
            res.status(200).send(message)
        }
        else {
            res.status(500).send('message could not be updated: ' + err)
        }
    })
})


/* DELETE */
router.delete('/', AuthenticationUtils.isAuthenticated, function (req, res, next) {
    console.log(req.body)
    messageService.deleteMessage(req.body._id, function (err, message) {
        if (message) {
            res.status(200).send('message: ' + message + ' is deleted')

        }
        else {
            res.status(500).send('message could not be deleted: ' + err)
        }
    })
})


module.exports = router
