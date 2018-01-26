const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const checkLoginRequestBody = (email, password) => {
  const isEmailMissing = 'undefined' == typeof email || 0 == email.length;
  const isPasswordMissing =
    'undefined' == typeof password || 0 == password.length;

  if (isEmailMissing || isPasswordMissing) {
    const errorFields =
      isEmailMissing && isPasswordMissing
        ? 'E-mail, Password'
        : isEmailMissing ? 'E-mail' : 'Password';
    return Promise.reject({
      status: 403,
      message: `Missing field(s): ${errorFields}`
    });
  }
};

const findUserInDatabase = async email => {
  try {
    const user = await userModel.getAll().where({ email: email });
    if (0 == user.length) {
      return Promise.reject({
        status: 403,
        message: 'User not found.'
      });
    }

    return user;
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An error occured while fetching user data from the database.'
    });
  }
};

const checkPassword = async (requestPassword, userPassword) => {
  try {
    const isPasswordMatches = await bcrypt.compare(
      requestPassword,
      userPassword
    );

    if (!isPasswordMatches) {
      return Promise.reject({
        status: 403,
        message: 'Email and/or Password mismatch.'
      });
    }
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An internal error occured while checking the user password.'
    });
  }
};

const createUserToken = async userId => {
  try {
    return await jwt.sign({ id: userId }, process.env.SECRET_KEY, {
      expiresIn: +process.env.TOKEN_EXPIRY
    });
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An internal error occured while creating the user token.'
    });
  }
};

const authenticateUser = async (email, password) => {
  await checkLoginRequestBody(email, password);

  const user = await findUserInDatabase(email);

  const res = await checkPassword(password, user[0].password);

  return user;
};

exports.login = async (req, res) => {
  try {
    const user = await authenticateUser(req.body.email, req.body.password);

    const token = await createUserToken(user[0].id);

    return res.status(200).json({ token: token, message: 'Login successful.' });
  } catch (error) {
    return res.status(error.status).json({
      message: error.message
    });
  }
};

const isValidateEmailFormat = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const checkRegisterRequestBody = (username, email, password) => {
  const isUsernameMissing =
    'undefined' == typeof username || 0 == username.length;
  const isEmailMissing = 'undefined' == typeof email || 0 == email.length;
  const isPasswordMissing =
    'undefined' == typeof password || 0 == password.length;

  if (isUsernameMissing || isPasswordMissing || isEmailMissing) {
    let errorMessage = 'Missing field(s): ';
    let isSeparationNeeded = false;

    if (isUsernameMissing) {
      errorMessage += 'Username';
      isSeparationNeeded = true;
    }

    if (isEmailMissing) {
      if (isSeparationNeeded) {
        errorMessage += ', ';
      }
      errorMessage += 'E-mail';
      isSeparationNeeded = true;
    }

    if (isPasswordMissing) {
      if (isSeparationNeeded) {
        errorMessage += ', ';
      }
      errorMessage += 'Password';
    }

    return Promise.reject({
      status: 403,
      message: errorMessage
    });
  }

  if (!isValidateEmailFormat(email)) {
    return Promise.reject({ status: 403, message: 'Not valid e-mail format.' });
  }
};

const checkUserInDatabase = async (username, email) => {
  let userExists = false;
  try {
    userExists = await userModel.exists(username, email);
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An internal error occured while accessing the database.'
    });
  }

  if (userExists) {
    return Promise.reject({ status: 403, message: 'User already exists.' });
  }
};

const validateRegisterRequest = async (username, email, password) => {
  await checkRegisterRequestBody(username, email, password);

  await checkUserInDatabase(username, email);
};

const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    return Promise.reject({
      status: 500,
      message: 'An internal error occured while hashing the user password.'
    });
  }
};

const createUser = async (username, email, hashedPassword) => {
  try {
    return (user = await userModel.insert(username, email, hashedPassword));
  } catch (error) {
    return Promise.reject({
      status: 500,
      message:
        'An internal error occured while inserting the user into the database.'
    });
  }
};

exports.register = async (req, res) => {
  try {
    await validateRegisterRequest(
      req.body.username,
      req.body.email,
      req.body.password
    );

    const hashedPassword = await hashPassword(req.body.password);

    const user = await createUser(
      req.body.username,
      req.body.email,
      hashedPassword
    );

    const token = await createUserToken(user[0]);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(error.status).json({
      message: error.message
    });
  }
};
