const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// creando modelos con mongoose
let placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  descrpition: String,
  acceptCreditCard: {
    type: Boolean,
    default: false
  },
  coverImage: String,
  avatarImage: String,
  openHour: Number,
  closeHour: Number
});

placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
