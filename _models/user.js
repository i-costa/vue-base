const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {type: String, required: true},
  firstName: {type: String, required: true},
  birthDate: Date,
  // password: {type: String, required: true},
  cep: String,
  cpf: String,
  hash: {type: String, required: true},
  salt: {type: String, required: true},
  avatar:  {type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'},
  createdDate: {type: Date, default: Date.now},
  activationDate: Date,
  active: {type: Boolean, default: false},
  activationToken: String,
  passwordResetToken: String
})

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

UserSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash === hash
}

UserSchema.methods.generateJWT = function() {
  const today = new Date()
  const expirationDate = new Date(today)
  expirationDate.setDate(today.getDate() + 60)

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'THIS_IS_SECRET')
}

UserSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  }
}

const User = mongoose.model('User', UserSchema)
module.exports = User
