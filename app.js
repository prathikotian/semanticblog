const express = require('express'),
      app = express(),
      routes = require('./routes/routes'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'), // external support for http methods
      codeSanitizer = require('express-sanitizer'), // prevents script atacks or any security threat
      PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(codeSanitizer())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`semantic blog server is running on port ${PORT}`)
})
