'use strict'
const Post = require('../models/post.model')
const awsService = require('../services/aws/upload_files')

const getPosts = (req, res) => {
    res.status(200).send({message: "send posts"})
}

const createPost = async (req, res) => {
    const {content, title } = req.body
    const file = req.file

    if (!content) return res.status(400).send({message: 'content no provided'})
    if (!title) return res.status(400).send({message: 'title no provided'})
    if (!file) return res.status(400).send({message: 'post image no provided'})
    
    const image_url =  await  awsService.uploadFileAws(file)

    const post = new Post()
    post.content = content
    post.title = title
    post.user = req.userId
    post.image_url = image_url

    post.save((err)=> {
        if(err) res.status(500).send({message: 'Error creating post'})
        
        res.status(201).send({message: "post created"})
    })
}

module.exports = {
    getPosts,
    createPost
}