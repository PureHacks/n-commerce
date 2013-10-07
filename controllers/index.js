
/*
 * GET home page.
 */
//var mockProducts = require('./products');
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;

exports.index = function(req, res){

  //check if user is logged in
  var user = req.isAuthenticated() ? req.user : false;

  console.log('logged in', user);

	//set cookie - http://expressjs.com/api.html#res.cookie
	res.cookie('test', 'cookie value josh', {signed: true});
	
	//var product = mockProducts.getProduct(3);

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
      , productList: products
      , user : user
    });
  };
};

