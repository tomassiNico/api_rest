const paramsBuilder = require('./helpers').paramsBuilder;

const Application = require('../models/Application');

const validParams = ["origins","name"];

function find(req,res, next){
  // encontrar un favorito
  Application.findById(req.params.application_id).then(app=>{
    req.application = app;
    req.mainObj = app;
    next();
  }).catch(error=>{
    console.log(error);
    next(error);
  })
}

function index(req,res){
  // obtener los favoritos de un usuario
  Application.paginate({},{ page: req.query.page || 1, limit: 8, sort: {'name': -1} })
    .then(docs=>{
      res.json(docs);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function create(req,res){
  // creacion de favorito
  let params = paramsBuilder(validParams, req.body);

  Application.create(params).then(app=>{
    res.json(app);
  }).catch(error=>{
    console.log(error)
    res.status(422).json({error});
  })
}

function destroy(req,res){
  // eliminar un favorito
  req.application.remove().then(app=>{
    res.json({});
  }).catch(error=>{
    console.log(error);
    res.status(500).json({error});
  })
}

module.exports = {
  create, find, destroy, index
}
