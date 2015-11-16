var mongoose = require('mongoose');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/meancart');

var User = mongoose.Model('User', schema, 'users');

var newuser = new User({
  name: 'Jose Mourinho',
  email: 'specialone@chelseafc.co.uk',
});

newuser.save( function(error){
  if (error){
    console.log(error);
    process.exit(1);
  }
  User.find({email: 'specialone@chelseafc.co.uk'}, function(error, docs){
    if(error){
      console.log(error);
      process.exit(1);
    }
    console.log(require('util').inspect(docs));
    process.exit(1);
  });
} );
