'use strict'
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
};

module.exports = mongoose.model("User", UserSchema)