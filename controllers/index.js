
/*
 * GET home page.
 */
var products = require('./products');
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;

exports.index = function(req, res){

	//set cookie - http://expressjs.com/api.html#res.cookie
	res.cookie('test', 'cookie value josh', {signed: true});
	
	//var entry = blogEngine.getBlogEntry(req.params.id);
	var product = products.getProduct(3);
	//var productResults = products.getProduct();

  Product.find(function(err, products) {
    if(err) {
      renderResponse([]);
    } else {
      renderResponse(products);
    }
  });

  var renderResponse = function (products) {
    if(!products.length) {
      products = [{name:'nameOne', desc: 'descOne'}];
    }
    res.render('home',{
      title:'N-Commerce Home'
      , productName: products[0].name
      , productDesc: products[0].desc
      , productList: products
    });
  };
};
