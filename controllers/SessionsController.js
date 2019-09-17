const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const User = require('../models/User');

function authenticate(req,res,next){
  // autenticación de usuario
  User.findOne({email: req.body.email})
    .then(user=>{
      user.verifyPassword(req.body.password)
        .then(valid=>{
          if (valid)
            req.user = user;
            next();
        }).catch(error=>{
          next(new Error('Credenciales invalidas'));
        })
    }).catch(error => {
      console.log(error);
      next(error);
    });
}


function generateToken(req,res,next){
  if (!req.user) return next();

  req.token = jwt.sign({id: req.user._id}, secrets.jwtSecret);
  next();
}

function sendToken(req,res){
  if (req.user){
    res.json({
      user: req.user,
      jwt: req.token
    })
  }else{
    res.stratus(422).json({
      error: 'No se pudo crear el usuario :('
    })
  }
}

module.exports = { generateToken, sendToken, authenticate }
