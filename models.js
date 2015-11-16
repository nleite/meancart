var productSchema = require('./schemas/product');
var categorySchema = require('./schemas/category');
var mongoose = require('mongoose');

module.exports= {
  Product: mongoose.model('Product', productSchema, 'products'),
  Category: mongoose.model('Category', categorySchema, 'categories')
}
