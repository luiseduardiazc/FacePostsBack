'use strict'
const bodyParser = require('body-parser')
const express =  require('express')
const cors = require('cors') 

const app = express()


// routes
const auth = require('./routes/auth')
const posts = require('./routes/posts')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.options("*", cors());

app.use("/api/auth", auth)
app.use("/api/posts", posts)

module.exports = app