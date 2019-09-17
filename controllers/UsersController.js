const User = require('../models/User');

const paramsBuilder = require('./helpers').paramsBuilder;

const validParams = ["email","name","password"];

function create(req,res){
  // creacion de un usuario
  let params = paramsBuilder(validParams, req.body);

  User.create(params).then(user=>{
    res.json(user);
  }).catch(error=>{
    console.log(error);
    res.status(422).json({
      error
    })
  });
}

module.exports = {
  create
}
