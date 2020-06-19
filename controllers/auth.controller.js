'use strict';
const User = require('../models/user.model');
const serviceAuth = require('../services/auth');

const singIn = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) return res.status(401).send({ message: "The email doesn't exists" });

  const comparePassword = await user.comparePassword(password, user.password);

  if (!comparePassword) return res.status(401).send({ message: "The password doesn't match" });

  const token = serviceAuth.createToken(user);

  res.status(200).send({
    auth: true,
    token
  });
};

const singUp = async (req, res) => {
  const user = new User();
  const { username, password, email } = req.body;

  user.username = username;
  user.password = await user.encryptPassword(password);
  user.email = email;

  const token = serviceAuth.createToken(user);

  user.save((err) => {
    if (err) res.status(500).send({ message: 'error creating user' });

    res.status(201).send({
      auth: true,
      token
    });
  });
};

module.exports = {
  singIn,
  singUp
};
