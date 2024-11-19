var express = require('express')
var router = express.Router()
var forumService = require('./ForumService')
var AuthenticationUtils = require('../../utils/AuthenticationUtils')


/* CREATE */
router.post('/', AuthenticationUtils.isAuthenticated, function (req, res, next) {
  console.log(req.body);
  forumService.createForum(req, function (err, forum) {
    if (forum) {
      res.status(200).send(forum)
    }
    else {
      res.status(400).send('forum could not be added: ' + err)
    }
  })
})


/* GET BY REQ.BODY */
router.post('/getByOwnerID', AuthenticationUtils.isAuthenticated, AuthenticationUtils.isAdmin, function (req, res, next) {
  console.log(req.body);
  forumService.getForumByOwnerID(req.body.ownerID, function (err, forum) {
    if (forum) {
      res.status(200).send(forum)
    }
    else {
      res.status(404).send('forum could not be found: ' + err)
    }
  })
})


/* GET BY TOKEN */
router.get('/getByOwnerID', AuthenticationUtils.isAuthenticated, function (req, res, next) {
  console.log(req.body)
  forumService.getForumByOwnerID(req.tokenData.user, function (err, forum) {
    if (forum) {
      res.status(200).send(forum)
    }
    else {
      res.status(404).send('forum could not be found: ' + err)
    }
  })
})


/* READ ALL FORUMS */
router.get('/', function (req, res, next) {
  console.log(req.body)
  forumService.getForums(function (err, forums) {
    if (forums) {
      res.status(200).send(Object.values(forums))
    }
    else {
      res.status(404).send('forums could not be found: ' + err)
    }
  })
})


/* UPDATE */
router.put('/', AuthenticationUtils.isAuthenticated, function (req, res) {
  console.log(req.body)
  let props = req.body
  forumService.updateForum(req.body._id, props, function (err, forum) {
    if (forum) {
      res.status(200).send(forum)
    }
    else {
      res.status(500).send('forum could not updated: ' + err)
    }
  })
})


/* DELETE */
router.delete('/', AuthenticationUtils.isAuthenticated, function (req, res, next) {
  console.log(req.body)
  forumService.deleteForum(req.body._id, function (err, forum) {
    if (forum) {
      res.status(200).send('forum: ' + forum + ' is deleted')
    }
    else {
      res.status(500).send('forum could not be deleted: ' + err)
    }
  })
})


module.exports = router
