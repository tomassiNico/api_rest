const Place = require('../models/Place');
const upload = require('../config/upload');
const uploader = require('../models/Uploader');
const helpers = require('./helpers');

const validParams = ["title","description","address","acceptCreditCard","openHour","closeHour"];

function find(req,res,next){
  Place.findOne({slug: req.params.id})
    .then(place =>{
      req.place = place;
      req.mainObj = place;
      next();
    }).catch(err=>{
      next(err);
    })
}

function index(req,res){
  //todos los lugares
  Place.paginate({},{ page: req.query.page || 1, limit: 8, sort: {'_id': -1} })
    .then(docs=>{
      res.json(docs);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function create(req,res,next){
  // crear nuevos lugares
  const params = helpers.paramsBuilder(validParams, req.body);
  console.log(req.user);
  params['_user'] = req.user.id;
  Place.create(params).then(doc=>{
    req.place = doc;
    next();
  }).catch(err=>{
    console.log(err);
    next(err);
  });
}

function show(req,res){
  // busqueda individual
  res.json(req.place);
}

function update(req,res){
  // actualizar datos de un lugar
  const params = helpers.paramsBuilder(validParams, req.body);
  req.place = Object.assign(req.place, params);

  req.place.save()
    .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function destroy(req,res){
  // eliminar un lugar
  req.place.remove()
    .then(doc=>{
      res.json({estado: "Recurso eliminado =O"})
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
}

function multerMiddleware(){
  // si se va arecibir solo un archivo se puede utilizar upload.single('nombre')
  return upload.fields([
    {name: 'avatar', maxCount: 1},
    {name: 'cover', maxCount: 1}
  ]);
}

function saveImage(req,res){
  if(req.place){
    const files = ['avatar','cover'];
    const promises = [];

    files.forEach(imageType=>{
      if(req.files && req.files[imageType]){
          const path = req.files[imageType][0].path;
          promises.push(req.place.updateImage(path,imageType));
        }
    })

    Promise.all(promises).then(results=>{
        console.log(results);
        res.json(req.place);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });

  }else{
    res.status(422).json({
      error: req.error || 'No se pudo guardar el lugar'
    });
  }

}

module.exports = {
  index, show, create, destroy, update, find, multerMiddleware, saveImage
}
