const User = require('../models/User');

module.exports = function(req,res,next){
  console.log("desde validar app "+ req.user)
  if (req.user){
    User.findById(req.user.id).then(user=>{
      req.fullUser = user;
      next();
    }).catch(error =>{
      console.log(error);
    })
  }else{
    next();
  }
}
