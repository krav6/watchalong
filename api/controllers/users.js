const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.login = async (req, res) => {
  const user = await userModel.getAll().where({ email: req.body.email });

  if (user.length == 0) {
    return res.status(400).json({ message: 'User not found.' });
  }

  const isPasswordMatches = await bcrypt.compare(
    req.body.password,
    user[0].password
  );

  if (!isPasswordMatches) {
    return res
      .status(400)
      .json({ message: "Email and password doesn't match." });
  }

  const token = await jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, {
    expiresIn: +process.env.TOKEN_EXPIRY
  });

  return res.status(200).json({ token });
};

exports.register = async (req, res) => {
  if (await userModel.exists(req.body.username, req.body.email)) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const hash = await bcrypt.hash(req.body.password, saltRounds);

  const user = await userModel.insert(req.body.username, req.body.email, hash);

  const token = await jwt.sign({ id: user[0] }, process.env.SECRET_KEY, {
    expiresIn: +process.env.TOKEN_EXPIRY
  });

  return res.status(201).json({ token });
};
