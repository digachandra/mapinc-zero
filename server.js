const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const path = require('path')
const routes = require('./routes')

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
app.set('view-engine','ejs')
app.use(cors())
app.use(morgan())
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/', express.static(path.join(__dirname, 'public')))
mongoose.connect('mongodb://localhost:27017/testing-mapinc-5')

app.use('/', routes)

app.listen(port)
console.log('serving on port : ', port)
