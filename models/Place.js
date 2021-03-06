const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('../models/Uploader');
const slugify = require('../plugins/slugify');

const Visit = require('./Visit');

// creando modelos con mongoose
let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  address: String,
  description: String,
  acceptCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

placeSchema.virtual('visits').get(function(){
  return Visit.find({'_place': this.id}).sort('-id');
});

placeSchema.methods.updateImage = function(path,imageType){
  return uploader(path)
    .then(secure_url=> this.saveImageUrl(secure_url,imageType));
}

placeSchema.methods.saveImageUrl = function(secureUrl,imageType){
  this[imageType+'Image'] = secureUrl;
  return this.save();
}

placeSchema.pre('save', function(next){
  if (this.slug) return next();
  generateSlugAndContinue.call(this,0,next);
});

placeSchema.plugin(mongoosePaginate);

placeSchema.statics.validateSlugCount = function(slug){
  return Place.countDocuments({slug: slug}).then(count=>{
    if (count > 0) return false;
    return true;
  }).catch(err=>{
    console.log(err);
  });
};

function generateSlugAndContinue(count,next){
  this.slug = slugify(this.title);

  if (count != 0)
    this.slug = this.slug + "-" + count;

  Place.validateSlugCount(this.slug).then(isValid=>{
    if (!isValid)
      return generateSlugAndContinue.call(this, count+1, next);

  next();
}).catch(err=>{
  console.log(err);
  next(err);
});
};

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
