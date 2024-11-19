const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    id: Number,
    userID: { type: String, unique: true },
    userName: String,
    email: String,
    password: String,
    isAdministrator: { type: Boolean, default: false },
}, { timestamps: true })

userSchema.pre('save', function (next) {
    var user = this
    if (user.isModified('password')) {
        bcrypt.hash(user.password, 10).then((hashedPassword) => {
            user.password = hashedPassword;
            next()
        })
    } else next()
})

userSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err)
            return next(err); next(null, isMatch)
    })
}

const User = mongoose.model('User', userSchema)

module.exports = User
