const mongoose = require('mongoose');
const randomstring = require('randomstring');

function assignRandomAndUnique(app, field, next){
  const randomString = randomstring.generate(20);
  
  let searchCriteria = {};
  searchCriteria[field] = randomString;

  Application.count(searchCriteria).then(count=>{
    if (count > 0) return assignRandomAndUnique(app, field, next);

    app[field] = randomString;
    next();
  })
};

let applicationSchema = new mongoose.Schema({
  applicationId: {
    type: String,
    required: true,
    unique: true
  },
  secret: {
    type: String,
    required: true,
    unique: true
  },
  origin: String,
  name: String
});

applicationSchema.pre('validate', function(next){
  assignRandomAndUnique(this, 'applicationId', ()=>{
    assignRandomAndUnique(this, 'secret', next);
  })
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;