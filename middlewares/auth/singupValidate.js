const User = require('../../models/user.model')

const singupValidate = async (req, res, next) => {
    const {username, password, email}  = req.body
    if (!username) return res.status(400).send({message: 'user name no provided'})
    if (!password) return res.status(400).send({message: 'password no provided'})
    if (!email) res.status(400).send({message: 'email no provided'})

    const existEmail = await User.findOne({email: email})
    if (existEmail) return res.status(400).send({message: 'user email already exist'})
    
    next()
}

module.exports = singupValidate