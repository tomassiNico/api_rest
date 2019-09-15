const Place = require('../models/Place');

function index(req,res){
  //todos los lugares
  Place.find({})
    .then(docs=>{
      res.json(docs);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function create(req,res){
  // crear nuevos lugares
  Place.create({
    title: req.body.title,
    descrpition: req.body.descrpition,
    acceptCreditCard: req.body.acceptCreditCard,
    openHour: req.body.openHour,
    closeHour: req.body.closeHour
  }).then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function show(req,res){
  // busqueda individual

  Place.findById(req.params.id)
    .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function update(req,res){
  // actualizar datos de un lugar
  let attributes = ["title","descrpition","acceptCreditCard","openHour","closeHour"];
  let placeParams = {};
  attributes.forEach(attr=>{
    if(Object.prototype.hasOwnProperty.call(req.body,attr)) {
      placeParams[attr] = req.body[attr];
    }
  });

  Place.findByIdAndUpdate(req.params.id,placeParams, {new: true})
  .then(doc=>{
    res.json(doc);
  }).catch(err=>{
    console.log(err);
    res.json(err);
  });
}

function destroy(req,res){
  // eliminar un lugar
  Place.findByIdAndRemove(req.params.id)
    .then(doc=>{
      res.json({estado: "Recurso eliminado =O", data: doc})
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

module.exports = {
  index, show, create, destroy, update
}
