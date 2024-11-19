var express = require('express')
var router = express.Router()
var userService = require('./UserService')


/* CREATE */
router.post('/', function (req, res, next) {
  console.log(req.body)
  userService.createUser(req.body, function (err, user) {
    if (user) {
      res.status(200).send(userSubset(user))
    }
    else {
      res.status(400).send('user could not be added: ' + err)
    }
  })
})


/* GET */
router.post('/getByUserID', function (req, res, next) {
  console.log(req.body)
  userService.getUserByID(req.body.userID, function (err, user) {
    if (user) {
      res.status(200).send(userSubset(user))
    }
    else {
      res.status(404).send('user could not be found: ' + err)
    }
  })
})

/* READ */
router.get('/', function (req, res, next) {
  userService.getUsers(function (err, users) {
    if (users) {
      var result = [];
      for (let user of users) {
        result.push(userSubset(user))
      }
      res.status(200).send(result)
    }
    else {
      res.status(404).send('users could not be found: ' + err)
    }

  })
})


/* UPDATE */
router.put('/', function (req, res) {
  let props = req.body
  userService.updateUser(req.body.userID, props, function (err, user) {
    if (user) {
      res.status(200).send(userSubset(user))
    }
    else {
      res.status(500).send('user could not be updated: ' + err)
    }
  })
})


/* DELETE */
router.delete('/', function (req, res, next) {
  userService.deleteUser(req.body.userID, function (err, user) {
    if (user) {
      res.status(200).send('user: ' + userSubset(user) + ' is deleted')
    }
    else {
      res.status(500).send('user could not be deleted: ' + err)
    }
  })
})

function userSubset(user) {
  if (!user) {
    return null
  }
  else {
    let { _id, userID, userName, email, isAdministrator } = user;
    let subset = { _id, userID, userName, email, isAdministrator };
    return subset;
  }
}


module.exports = router;
