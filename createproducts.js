var mongoose = require('mongoose');
var productSchema = require('./schemas/product');


mongoose.connect('mongodb://localhost/meancart');

var Product = mongoose.model('Product', productSchema, 'products');

var p1 = new Product({
  name: 'Chelsea FC Blue Scarf',
  pictures: ['http://image.server']
});
