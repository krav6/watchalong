const jwt = require('jsonwebtoken');

exports.handle = async (req, res, next) =>{
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ')

    const bearerToken = bearer[1];

    try {
      await jwt.verify(bearerToken, process.env.SECRET_KEY);
      req.token = bearerToken;
      next();
    } catch (error) {
      res.sendStatus(404);
    }
  }
  else{
    res.sendStatus(403);
  }
}