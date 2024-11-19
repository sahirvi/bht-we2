const mongoose = require('mongoose')

const forumSchema = new mongoose.Schema({
    ownerID: String,
    forumName: String,
    forumDescription: String,
}, { timestamps: true })

const Forum = mongoose.model('Forum', forumSchema)

module.exports = Forum


