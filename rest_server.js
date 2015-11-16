var bodyParser = require('body-parser');
var models = require('./models');
var express = require('express');
var mongoose = require('mongoose');
var status = require('http-status');
var productSchema = require('./schemas/product');
var app = express();

//allowing CORS just for testing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
//body parser for json payloads
app.use(bodyParser.json());
//api version
app.use('/api/v1', require('./api'));

//example not using API structure
app.get('/products', function(req, res){
  var limit = 10;
  var items = Product.find().limit(10).
  exec( function(err, docs){
    if(err){
      console.log("WRONG: "+err.toString());
      return res.status(status.INTERNAL_SERVER_ERROR).
      json({error: err.toString()});
    }
    res.json({products: docs});
  });
});
//start listening
app.listen(3000);
console.log("super REST app running");
