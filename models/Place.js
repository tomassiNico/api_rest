const mongoose = require('mongoose');

// creando modelos con mongoose
let placeShema = new mongoose.Schema({
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

let Place = mongoose.model('Place', placeShema);

module.exports = Place;
