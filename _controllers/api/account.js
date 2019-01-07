const mongoose = require('mongoose')
const router = require('express').Router()
const auth = require('../auth')
const helpers = require('../helpers')
const fs = require("fs")
const path = require("path")
const Hogan = require('hogan.js')
const User = mongoose.model('User')

//POST Create new account
router.post('/register', auth.optional, (req, res, next) => {
  console.log(req.headers.origin)
  // verify if e-mail exists
  const sentInfo = req.body.params.toSendInfo
  User.findOne({'email': sentInfo.email}, function (err, user) {
    if (err) {console.log(err)}
    if (user) {
      return res.json({
        status: 201,
        message: 'E-mail already registered'
      })
    } else {
      // verify birthdate
      if (sentInfo.birthDate) {
        let dataNova = helpers.correctDate(sentInfo.birthDate)
        sentInfo.birthDate = dataNova
      }
      
      const finalUser = new User(sentInfo)
      finalUser.setPassword(sentInfo.password)
      finalUser.activationToken = finalUser.generateJWT()

      console.log(finalUser)
      finalUser.save()

      let emailTemplate = path.join(__dirname + "/../email/register.mustache")
      fs.readFile(emailTemplate, 'utf8', function(err, content) {
        if (err) {console.log(err)}
        let template =  Hogan.compile(content)
        let activationLink = req.headers.origin + '/activate-account?token=' + finalUser.activationToken
        let body = template.render({userName: finalUser.firstName, activationLink: activationLink})
        helpers.transporter.sendMail(helpers.transporterOptions(finalUser.email, 'Activate your account', body), function (err, info) {
          if (err) { 
            console.log(err)
            return res.json({
              status: 201,
              message: 'The user was registered, but the activation e-mail was not sent'
            })
          }
          else {
            console.log(info)
            return res.json({
              status: 200,
              message: 'The user was registered and the activation e-mail was sent'
            })
          }
        })
      })

    }
  })
})

//POST Login into account
router.post('/login', auth.optional, (req, res, next) => {
  const sentInfo = req.body.params

  if (!sentInfo.email && !sentInfo.password) {
    return res.json({ status: 402, message: 'Missing email or password' })
  }

  User.findOne({'email': sentInfo.email}, function(err, user) {
    if (err) {
      console.log(err)
    } 
    if (user) {
      if (user.hash === helpers.validatePassword(sentInfo.password, user.salt)) {
        if (user.active === false) {
          return res.json({ status: 403, message: 'User is not active'})
        }
        return res.json({ status: 200, message: 'User successfully authenticated', result: user, token: 'user.toAuthJson()' })
      } else {
        return res.json({ status: 402, message: 'E-mail or password is incorrect' })
      }
    } else {
      return res.json({ status: 404, message: 'User does not exists' })
    }
  })

})

//GET Activate account
router.get('/activateAccount/:activationToken', auth.optional, (req, res, next) => {
  User.findOne({'activationToken': req.params.activationToken}, function (err, user) {
    if (err) {
      console.log(err)
      return res.json({ status: 500, message: 'Some error occurred', error: err})
    }
    if (user) {
      user.active = true
      user.activationToken = null
      user.save()
      let emailTemplate = path.join(__dirname + "/../email/accountActivated.mustache")
      fs.readFile(emailTemplate, 'utf8', function(err, content) {
        if (err) {console.log(err)}
        let template =  Hogan.compile(content)
        let body = template.render({ userName: user.firstName })
        helpers.transporter.sendMail(helpers.transporterOptions(user.email, 'Your account is active :)', body), function (err, info) {
          if (err) { 
            console.log(err)
            return res.json({
              status: 201,
              message: 'User account was activated, but the e-mail was not sent'
            })
          }
          else {
            console.log(info)
            return res.json({
              status: 200,
              message: 'User account was activated and the e-mail was sent'
            })
          }
        })
      })
    } else {
      return res.json({ status: 401, message: 'User was not found' })
    }
  }) 
})

//POST Forgot password
router.post('/forgotPassword', auth.optional, (req, res, next) => {
  User.findOne({'email': req.body.params.toSendInfo.email}, function (err, user) {
    if (err) {
      console.log(err)
      return res.json({ status: 500, message: 'Some error occurred', error: err})
    }
    if (user) {
      user.passwordResetToken = user.generateJWT()
      console.log(user)
      user.save()
      let emailTemplate = path.join(__dirname + "/../email/forgotPassword.mustache")
      fs.readFile(emailTemplate, 'utf8', function(err, content) {
        if (err) {console.log(err)}
        let template =  Hogan.compile(content)
        let resetLink = req.headers.origin + '/reset-password?token=' + user.passwordResetToken
        let body = template.render({ userName: user.firstName, resetLink: resetLink })
        helpers.transporter.sendMail(helpers.transporterOptions(user.email, 'You forgot your password?', body), function (err, info) {
          if (err) { 
            console.log(err)
            return res.json({
              status: 201,
              message: 'Password reset token was generated, but the e-mail was not sent'
            })
          }
          else {
            console.log(info)
            return res.json({
              status: 200,
              message: 'Password reset token was generated and the e-mail was sent'
            })
          }
        })
      })
    } else {
      return res.json({ status: 401, message: 'User was not found' })
    }
  }) 
})

//POST Reset password
router.post('/resetPassword', auth.optional, (req, res, next) => {
  User.findOne({'email': req.body.params.toSendInfo.email}, function (err, user) {
    if (err) {
      console.log(err)
      return res.json({ status: 500, message: 'Some error occurred', error: err})
    }
    if (user) {
      if (user.passwordResetToken === req.body.params.toSendInfo.token) {
        user.passwordResetToken = null
        user.hash = helpers.validatePassword(req.body.params.toSendInfo.password, user.salt)
        user.save()
        let emailTemplate = path.join(__dirname + "/../email/resetPassword.mustache")
        fs.readFile(emailTemplate, 'utf8', function(err, content) {
          if (err) {console.log(err)}
          let template =  Hogan.compile(content)
          let body = template.render({ userName: user.firstName})
          helpers.transporter.sendMail(helpers.transporterOptions(user.email, 'Your password was reseted', body), function (err, info) {
            if (err) { 
              console.log(err)
              return res.json({
                status: 201,
                message: 'Password was reseted, but the e-mail was not sent'
              })
            }
            else {
              console.log(info)
              return res.json({
                status: 200,
                message: 'Password was reseted and the e-mail was sent'
              })
            }
          })
        })
      } else {
        return res.json({ status: 402, message: 'User was found, but token is incorrect or expired' })
      }
    } else {
      return res.json({ status: 401, message: 'User was not found' })
    }
  }) 
})

//POST Resend activation e-mail
router.post('/resendActivationEmail', auth.optional, (req, res, next) => {
  User.findOne({'email': req.body.params.toSendInfo.email}, function (err, user) {
    if (err) {
      console.log(err)
      return res.json({ status: 500, message: 'Some error occurred', error: err})
    }
    if (user) {
      if (user.active === true) {
        return res.json({ status: 402, message: 'User already is active' })
      }
      let emailTemplate = path.join(__dirname + "/../email/resendActivationEmail.mustache")
      fs.readFile(emailTemplate, 'utf8', function(err, content) {
        if (err) {console.log(err)}
        let template =  Hogan.compile(content)
        let activationLink = req.headers.origin + '/activate-account?token=' + user.activationToken
        let body = template.render({userName: user.firstName, activationLink: activationLink})
        helpers.transporter.sendMail(helpers.transporterOptions(user.email, 'Activate your account', body), function (err, info) {
          if (err) { 
            console.log(err)
            return res.json({
              status: 201,
              message: 'Tthe activation e-mail was not sent'
            })
          }
          else {
            console.log(info)
            return res.json({
              status: 200,
              message: 'The activation e-mail was sent'
            })
          }
        })
      })

    } else {
      return res.json({ status: 401, message: 'User was not found' })
    }
  }) 
})

//GET current route (required, only authenticated users have access)
router.get('/current', auth.optional, (req, res, next) => {
  // const { payload: { id } } = req;

  // return Users.findById(id)
  //   .then((user) => {
  //     if(!user) {
  //       return res.sendStatus(400);
  //     }

  //     return res.json({ user: user.toAuthJSON() });
  //   });

  return res.json({ status: 'vdfvdfvd' })
})

module.exports = router
