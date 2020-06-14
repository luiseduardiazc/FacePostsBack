'use strict'

const express = require('express')
const middleware = require('../middlewares/auth')
const postsController = require('../controllers/post.controller')

const router = express.Router()

router.get('/', middleware.verifyToken, postsController.getPosts)
router.post('/', middleware.verifyToken, postsController.createPost)


module.exports = router