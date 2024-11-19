const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    forumID: String,
    authorID: String,
    messageTitle: String,
    messageText: String,
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
