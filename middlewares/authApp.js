const Application = require('../models/Application');

module.exports = function(options){
  let AuthApp = function(req,res,next){
    Application.countDocuments({}).then(appCount=>{
      if(appCount > 0 && !req.application) return next(new Error("Una aplicacion es obligatoria para consumir esta API"));


      if(!req.validRequest) return next(new Error("Origin invalido"));
      req.validApp = true;
      next();
    }).catch(next);
  }

  AuthApp.unless = require('express-unless');

  return AuthApp;
}
