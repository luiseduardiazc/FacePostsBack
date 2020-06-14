'use strict'

const express = require('express')
const middleware = require('../middlewares/auth')
const multer = require('multer')
const postsController = require('../controllers/post.controller')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.get('/', middleware.verifyToken, postsController.getPosts)
router.post('/', middleware.verifyToken, upload.single("file"), postsController.createPost)


module.exports = router