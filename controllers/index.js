
/*
 * GET home page.
 */
var mockProducts = require('./products');
var db = require('../lib/storage').db;
var Product = require('../models/Product').Product;

exports.index = function(req, res){

	//set cookie - http://expressjs.com/api.html#res.cookie
	res.cookie('test', 'cookie value josh', {signed: true});
	
	//var entry = blogEngine.getBlogEntry(req.params.id);
	var product = mockProducts.getProduct(3);

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
      , productName: products[products.length-1].name
      , productDesc: products[products.length-1].desc
      , productList: products
    });
  };
};

exports.addProduct = function(req, res){
  var name = req.param('name');
  var desc = req.param('desc');

  // create instance of Product from req params
  var product = new Product({
    name: name,
    dec: desc
  });  //instance created

  product.save(function(err) {
    if(err) {
      //console.log('error saving product name: ' + product.name);
    }
    res.render('home',{
      title:'N-Commerce Home'
      , productName: product.name
      , productDesc: product.desc
      , productList: [product]
    });
  })
};
