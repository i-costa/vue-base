const express = require('express')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const history = require('connect-history-api-fallback')

mongoose.connect('mongodb://username:password@host.mlab.com:port/baseName', { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(callback){
  console.log('[DATABASE] Connection to database succeeded')
})


const app = express()
app.use(history())
app.use(morgan('combined'))
app.use(cors())
app.use(serveStatic(__dirname + '/../dist/'))
app.use(bodyParser.json())
app.use(session({ secret: 'THIS_IS_SECRET', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }))

require('../_models/user')
require('../_config/passport')
// controllers and routes
app.use(require('../_controllers'))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 500)
  res.render(err)
  // res.send('index.html')
});
//  #endregion


let port = process.env.PORT || 8081 
app.listen(port, () => {
  console.log('[SERVER APPLICATION] The application server has started in http://localhost:' + port)
})

module.exports = app
