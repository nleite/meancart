var mongoose = require('mongoose');
var schema = require('./schemas/category');

mongoose.connect('mongodb://localhost/test');
Category = mongoose.model('Category', schema.categorySchema, 'categories');


cat = new Category({
  _id: 'wearables',
  parent: 'all'
});


cat.save(function(err){
  if(err){
    console.log('error '+ err.toString());
  }
});
