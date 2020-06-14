'use strict'

const singupValidate = require('./singupValidate')
const verifyToken = require('./verifyToken') 
const validators = {
    singupValidate,
    verifyToken
}

module.exports =  validators