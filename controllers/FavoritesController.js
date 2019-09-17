const paramsBuilder = require('./helpers').paramsBuilder;

const FavoritePlace = require('../models/FavoritePlace');
const User = require('../models/User');

const validParams = ["_place"];

function find(req,res,next){
  // encontrar un favorito
  FavoritePlace.findById(req.params.id).then(fav=>{
    req.mainObj = fav;
    req.favorite = fav;
    next();
  }).catch(error=>{
    console.log(error);
    next(error);
  })
}

function index(req,res){
  // obtener los favoritos de un usuario
  User.findOne({'_id': req.user.id}).then(user=>{
    user.favorites.then(places=>{
      res.json(places);
    }).catch(error=>{
      console.log(error);
      res.json(error);
    })
  })
}

function create(req,res){
  // creacion de favorito
  let params = paramsBuilder(validParams, req.body);
  params['_user'] = req.user.id;
  FavoritePlace.create(params).then(doc=>{
    res.json(doc);
  }).catch(error=>{
    console.log(error)
    res.status(422).json({error});
  })
}

function destroy(req,res){
  // eliminar un favorito
  req.favorite.remove().then(doc=>{
    res.json({});
  }).catch(error=>{
    console.log(error);
    res.status(500).json({error});
  })
}

module.exports = {
  create, find, destroy, index
}
