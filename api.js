var express = require('express');
var status = require('http-status');
var mongoose = require('mongoose');
var models = require('./models');
var Stripe = require('stripe');
mongoose.connect('mongodb://localhost/test');

var api = express.Router();

function errorHandler(res, err){
  console.log('something went wrong: '+err.toString());
  return res.status(status.INTERNAL_SERVER_ERROR).
  json({error: err.toString()});
}
/*=======================PRODUCTS=================================*/
api.get('/products', function(req, res){
  console.log(models);
  var limit = 10;
  var items = models.Product.find().limit(10).
  exec( function(err, docs){
    if(err){
      return errorHandler(res, err);
    }
    res.json({products: docs});
  });
});
/*=======================CHECKOUT=================================*/
api.put('/me/cart', function(req, res){
  try{
    var cart = req.body.cart;
  }catch(e){
    return errorHandler(res, error);
  }
  req.user.data.cart = cart;
  req.user.save(function(err, user){
    if(err){
      return errorHandler(res, err);
    }
    return res.json({user: user});
  });
});
api.post('/checkout', function(req, res){
  if(!req.user){console.log('error to treat');}

  req.user.populate(
    {path: 'data.cart.product', model:'Product'},
    function(err, user){
      var totalCostGBP = 0;
      _.each(user.data.cart, function(item){
        totalCostGBP += item.product.amount * item.quantity;
      });
      Stripe.charges.create({
        // Stripe requires the price in cents
        amount: Math.ceil(totalCostGBP*100),
        currency: 'gbp',
        source: req.body.stripeToken,
        description: 'Thank you for your money'
      }, function(err, charge){console.log('treat this please')} );
    });
});

/*=======================CATEGORY=================================*/
api.get('/category/parent/:id', function(req, res){
  var query = { parent: req.params.id};
  var sort = {_id: -1};
  models.Category.find(query).sort(sort).exec(function(err, docs){
    if (err){
      return errorHandler(res, err);
    }
    res.json({categories: docs});
  });
});



module.exports = api;
