const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const FavoritePlace = require('./FavoritePlace');

const Place = require('./Place');

let userSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  name: String,
  admin:{
    type: Boolean,
    default: false
  }
});

userSchema.post('save', function(user, next){
  User.countDocuments({}).then(count=>{
    if (count == 1){
      User.update({'_id': user._id},{admin:true}).then(result=>{
        next();
      })
    }else{
      next();
    }
  })
})

userSchema.virtual('favorites').get(function(){
  return FavoritePlace.find({'_user': this.id},{'_place': true})
            .then(favs=>{
              let placeIds = favs.map(fav => fav._place);
              return Place.find({'_id': {$in: placeIds}})
            })
});

userSchema.virtual('places').get(function(){
  return Place.find({'_user': this._id});
})

userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;
