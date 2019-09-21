const paramsBuilder = require('./helpers').paramsBuilder;

const Visit = require('../models/Visit');
const User = require('../models/User');

const validParams = ["_place","reaction","observation"];

function find(req,res,next){
  // encontrar un favorito
  Visit.findById(req.params.visit_id).then(visit=>{
    req.mainObj = visit;
    req.visit = visit;
    next();
  }).catch(error=>{
    console.log(error);
    next(error);
  })
}

function index(req,res){
  // obtener los favoritos de un usuario
  let promise = null;
  console.log('req.place');
  if (req.place){
    promise = req.place.visits;
  }else if(req.user){
    promise = Visit.forUser(req.user.id, req.query.page || 1);
  }

  if (promise){
    promise.then(visits=>{
      res.json(visits);
    }).catch(error=>{
      console.log(error);
      res.status(500).json({error});
    })
  }else{
    res.status(500).json({});
  }
}

function create(req,res){
  // creacion de favorito
  let params = paramsBuilder(validParams, req.body);
  params['_user'] = req.user.id;

  Visit.create(params).then(visit=>{
    res.json(visit);
  }).catch(error=>{
    console.log(error)
    res.status(422).json({error});
  })
}

function destroy(req,res){
  // eliminar un favorito
  req.visit.remove().then(visit=>{
    res.json({});
  }).catch(error=>{
    console.log(error);
    res.status(500).json({error});
  })
}

module.exports = {
  create, find, destroy, index
}
