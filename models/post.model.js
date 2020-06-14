'use strict'

const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    content: {type: String, required: true},
    title: {type:String, required: true},
    image_url: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Post", PostSchema)
