const Application = require('../models/Application');

module.exports = function(req,res,next){
  Application.countDocuments({}).then(appCount=>{
    if(appCount > 0 && !req.application) return next(new Error("Una aplicacion es obligatoria para consumir esta API"));

    console.log("authApp");
    req.validApp = true;
    next();
  }).catch(next);
}
