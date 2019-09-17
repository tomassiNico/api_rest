const User = require('../models/User');

const paramsBuilder = require('./helpers').paramsBuilder;

const validParams = ["email","name","password"];

function create(req,res,next){
  // creacion de un usuario
  let params = paramsBuilder(validParams, req.body);

  User.create(params).then(user=>{
    req.user = user;
    next();
  }).catch(error=>{
    console.log(error);
    next(error);
  });
}

module.exports = {
  create
}
