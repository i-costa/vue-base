const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = mongoose.model('User')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => { 
  User.findOne({ 'email' : username })
    .then((user) => {
      if(!user || !user.validatePassword(password)) { 
        return done(null, false, { errors: { 'email or password': 'is invalid' }, info: user })
      } 
      return done(null, user)
    }).catch(done)
}))

