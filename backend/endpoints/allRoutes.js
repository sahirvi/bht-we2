var indexRoute = require('./index')
var userRoute = require('./user/UserRoute')
var publicUserRoute = require('./user/PublicUserRoute')
var forumRoute = require('./forum/ForumRoute')
var forumMessage = require('./message/MessageRoute')
var authenticationRoute = require('./authentication/AuthenticationRoute')

module.exports = {
    indexRoute,
    userRoute,
    publicUserRoute,
    forumRoute,
    forumMessage,
    authenticationRoute,
}