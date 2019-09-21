module.exports = function(req,res,next){
  if (req.fullUser && req.fullUser.admin) return next();

  next(new Error('Necesitas ser un admin para acceder aquí'));
}
