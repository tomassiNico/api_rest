module.exports = function(req,res,next){
  if (req.mainObj && (req.mainObj._user == req.user.id)) return next();
  console.log('No tienes permisos modificar este registro');
  next(new Error('No tienes permisos modificar este registro'));
}
