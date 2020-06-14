'use strict'
const jwt = require('jsonwebtoken')
const config = require('../../config')

const createToken = (user) => {

   const token =  jwt.sign({
        id: user._id
      }, config.server.SECRET_KEY , { expiresIn: '1h' });

    return token
}

module.exports = {
    createToken
}