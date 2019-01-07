const crypto = require('crypto')
const nodemailer = require('nodemailer')

let helpers = {
  setPassword: function (receivedPassword) {
    this.salt = 'THIS_IS_SECRET'
    this.password = crypto.pbkdf2Sync(receivedPassword, this.salt, 10000, 512, 'sha512').toString('hex')
    return { salt: this.salt, password: this.password}
  },
  validatePassword: function(receivedPassword, receivedSalt) {
    const hash = crypto.pbkdf2Sync(receivedPassword, receivedSalt, 10000, 512, 'sha512').toString('hex')
    return hash
  },
  correctDate: function (receiveDate) {
    var correctingDate = receiveDate.replace(/([0-9]+)\/([0-9]+)\/([0-9]+)/,"$2" + "/" + "$1" + "/" + "$3")
    var correctDate = new Date(correctingDate)
    return correctDate
  },
  transporter: nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'your@password'
    }
  }),
  transporterOptions: function (to, subject, body) {
    return {
      from: 'youremail@gmail.com',
      to: to,
      subject: subject,
      html: body
    }
  }
}

module.exports = helpers
